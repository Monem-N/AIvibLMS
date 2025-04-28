/**
 * Content Service
 *
 * Service for managing content like pages and announcements.
 * Provides methods for CRUD operations on content items.
 */

import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, serverTimestamp, QueryConstraint } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { uploadFile, getPublicUrl } from './supabaseStorageService';
import { BUCKETS } from './supabaseStorageService';

// Development mode flag - set to true to use mock data
const USE_MOCK_DATA = true; // Change to false when Firebase permissions are set up correctly

// Content Types
export interface Page {
  id?: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featuredImage?: string;
  author: string;
  authorId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  lastUpdated?: string; // Formatted date string for display
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  status: 'active' | 'scheduled' | 'expired';
  publishDate: Timestamp | string;
  expiryDate: Timestamp | string;
  audience: string[];
  author: string;
  authorId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Helper function to generate a slug from a title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Helper function to format a timestamp for display
const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Get Firestore instance
const db = getFirestore();

// Mock data for development
const mockPages: Page[] = [
  {
    id: 'mock-page-1',
    title: 'Welcome to AIvibLMS',
    slug: 'welcome-to-aiviblms',
    content: '<h2>Welcome to AIvibLMS</h2><p>This is a mock page for development.</p><p>AIvibLMS is a modern learning management system built with React, TypeScript, and Firebase.</p>',
    status: 'published',
    author: 'Development User',
    authorId: 'dev-user-id',
    lastUpdated: 'Just now'
  },
  {
    id: 'mock-page-2',
    title: 'Getting Started Guide',
    slug: 'getting-started-guide',
    content: '<h2>Getting Started with AIvibLMS</h2><p>This is a mock page for development.</p><p>Follow these steps to get started with AIvibLMS:</p><ol><li>Create an account</li><li>Explore courses</li><li>Enroll in a course</li></ol>',
    status: 'published',
    author: 'Development User',
    authorId: 'dev-user-id',
    lastUpdated: 'Yesterday'
  },
  {
    id: 'mock-page-3',
    title: 'About Us',
    slug: 'about-us',
    content: '<h2>About AIvibLMS</h2><p>This is a mock page for development.</p><p>AIvibLMS is a project developed by the AIvib team to provide a modern learning experience.</p>',
    status: 'draft',
    author: 'Development User',
    authorId: 'dev-user-id',
    lastUpdated: 'Last week'
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: 'mock-announcement-1',
    title: 'New Courses Available',
    content: '<h3>New Courses Available</h3><p>This is a mock announcement for development.</p><p>Check out our new courses on React, TypeScript, and Firebase!</p>',
    status: 'active',
    author: 'Development User',
    authorId: 'dev-user-id',
    publishDate: formatDate(Timestamp.fromDate(new Date())),
    expiryDate: formatDate(Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))),
    audience: ['All Users']
  },
  {
    id: 'mock-announcement-2',
    title: 'System Maintenance',
    content: '<h3>System Maintenance</h3><p>This is a mock announcement for development.</p><p>The system will be down for maintenance on Sunday from 2 AM to 4 AM.</p>',
    status: 'scheduled',
    author: 'Development User',
    authorId: 'dev-user-id',
    publishDate: formatDate(Timestamp.fromDate(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000))),
    expiryDate: formatDate(Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))),
    audience: ['Students', 'Instructors']
  },
  {
    id: 'mock-announcement-3',
    title: 'Welcome to the New Semester',
    content: '<h3>Welcome to the New Semester</h3><p>This is a mock announcement for development.</p><p>We are excited to welcome you to the new semester!</p>',
    status: 'active',
    author: 'Development User',
    authorId: 'dev-user-id',
    publishDate: formatDate(Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))),
    expiryDate: formatDate(Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))),
    audience: ['All Users']
  }
];

/**
 * Get all pages with optional filtering
 * @param options Optional filtering options
 * @returns Promise resolving to an array of pages
 */
export const getPages = async (options?: { status?: string; search?: string }): Promise<Page[]> => {
  // Use mock data in development mode
  if (USE_MOCK_DATA) {
    console.log('Using mock data for getPages');
    let filteredPages = [...mockPages];

    // Apply status filter if provided
    if (options?.status && options.status !== 'all') {
      filteredPages = filteredPages.filter(page => page.status === options.status);
    }

    // Apply search filter if provided
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filteredPages = filteredPages.filter(page =>
        page.title.toLowerCase().includes(searchLower) ||
        page.slug.toLowerCase().includes(searchLower) ||
        page.content.toLowerCase().includes(searchLower)
      );
    }

    return filteredPages;
  }

  // Use real Firebase data
  try {
    const pagesRef = collection(db, 'pages');
    const constraints: QueryConstraint[] = [];

    // Add status filter if provided
    if (options?.status && options.status !== 'all') {
      constraints.push(where('status', '==', options.status));
    }

    // Add ordering
    constraints.push(orderBy('updatedAt', 'desc'));

    const q = query(pagesRef, ...constraints);
    const querySnapshot = await getDocs(q);

    let pages: Page[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Page;
      pages.push({
        ...data,
        id: doc.id,
        lastUpdated: data.updatedAt ? formatDate(data.updatedAt as Timestamp) : 'Unknown'
      });
    });

    // Apply search filter if provided (client-side filtering)
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      pages = pages.filter(page =>
        page.title.toLowerCase().includes(searchLower) ||
        page.slug.toLowerCase().includes(searchLower) ||
        page.content.toLowerCase().includes(searchLower)
      );
    }

    return pages;
  } catch (error) {
    console.error('Error getting pages:', error);

    // Fallback to mock data if there's an error
    if (error instanceof Error && error.message.includes('permission')) {
      console.warn('Permission error detected. Using mock data as fallback.');
      return mockPages;
    }

    throw error;
  }
};

/**
 * Get a specific page by ID
 * @param id Page ID
 * @returns Promise resolving to the page data
 */
export const getPage = async (id: string): Promise<Page> => {
  // Use mock data in development mode
  if (USE_MOCK_DATA) {
    console.log('Using mock data for getPage:', id);
    const page = mockPages.find(page => page.id === id);

    if (!page) {
      throw new Error(`Page with ID ${id} not found`);
    }

    return page;
  }

  // Use real Firebase data
  try {
    const pageRef = doc(db, 'pages', id);
    const pageSnap = await getDoc(pageRef);

    if (!pageSnap.exists()) {
      throw new Error(`Page with ID ${id} not found`);
    }

    const data = pageSnap.data() as Page;
    return {
      ...data,
      id: pageSnap.id,
      lastUpdated: data.updatedAt ? formatDate(data.updatedAt as Timestamp) : 'Unknown'
    };
  } catch (error) {
    console.error('Error getting page:', error);

    // Fallback to mock data if there's an error
    if (error instanceof Error && error.message.includes('permission')) {
      console.warn('Permission error detected. Using mock data as fallback.');
      const page = mockPages.find(page => page.id === id);

      if (!page) {
        throw new Error(`Page with ID ${id} not found`);
      }

      return page;
    }

    throw error;
  }
};

/**
 * Create a new page
 * @param pageData Page data
 * @returns Promise resolving to the new page ID
 */
export const createPage = async (pageData: Partial<Page>): Promise<string> => {
  // Use mock data in development mode
  if (USE_MOCK_DATA) {
    console.log('Using mock data for createPage:', pageData);

    // Generate slug if not provided
    if (!pageData.slug && pageData.title) {
      pageData.slug = generateSlug(pageData.title);
    }

    // Generate a mock ID
    const mockId = `mock-page-${Date.now()}`;

    // Create a new mock page
    const newPage: Page = {
      id: mockId,
      title: pageData.title || 'Untitled Page',
      slug: pageData.slug || 'untitled-page',
      content: pageData.content || '',
      status: pageData.status as 'published' | 'draft' || 'draft',
      author: pageData.author || 'Development User',
      authorId: pageData.authorId || 'dev-user-id',
      lastUpdated: 'Just now',
      featuredImage: pageData.featuredImage,
      metaTitle: pageData.metaTitle || '',
      metaDescription: pageData.metaDescription || '',
      keywords: pageData.keywords || ''
    };

    // Add to mock pages
    mockPages.push(newPage);

    return mockId;
  }

  // Use real Firebase data
  try {
    const pagesRef = collection(db, 'pages');

    // Generate slug if not provided
    if (!pageData.slug && pageData.title) {
      pageData.slug = generateSlug(pageData.title);
    }

    // Add timestamps
    const newPage = {
      ...pageData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(pagesRef, newPage);
    return docRef.id;
  } catch (error) {
    console.error('Error creating page:', error);

    // Fallback to mock data if there's an error
    if (error instanceof Error && error.message.includes('permission')) {
      console.warn('Permission error detected. Using mock data as fallback.');

      // Generate slug if not provided
      if (!pageData.slug && pageData.title) {
        pageData.slug = generateSlug(pageData.title);
      }

      // Generate a mock ID
      const mockId = `mock-page-${Date.now()}`;

      // Create a new mock page
      const newPage: Page = {
        id: mockId,
        title: pageData.title || 'Untitled Page',
        slug: pageData.slug || 'untitled-page',
        content: pageData.content || '',
        status: pageData.status as 'published' | 'draft' || 'draft',
        author: pageData.author || 'Development User',
        authorId: pageData.authorId || 'dev-user-id',
        lastUpdated: 'Just now',
        featuredImage: pageData.featuredImage,
        metaTitle: pageData.metaTitle || '',
        metaDescription: pageData.metaDescription || '',
        keywords: pageData.keywords || ''
      };

      // Add to mock pages
      mockPages.push(newPage);

      return mockId;
    }

    throw error;
  }
};

/**
 * Update an existing page
 * @param id Page ID
 * @param pageData Updated page data
 * @returns Promise resolving when the update is complete
 */
export const updatePage = async (id: string, pageData: Partial<Page>): Promise<void> => {
  // Use mock data in development mode
  if (USE_MOCK_DATA) {
    console.log('Using mock data for updatePage:', id, pageData);

    // Find the page in mock data
    const pageIndex = mockPages.findIndex(page => page.id === id);

    if (pageIndex === -1) {
      throw new Error(`Page with ID ${id} not found`);
    }

    // Generate slug if title changed and slug not provided
    if (pageData.title && !pageData.slug) {
      pageData.slug = generateSlug(pageData.title);
    }

    // Update the page in mock data
    mockPages[pageIndex] = {
      ...mockPages[pageIndex],
      ...pageData,
      lastUpdated: 'Just now'
    };

    return;
  }

  // Use real Firebase data
  try {
    const pageRef = doc(db, 'pages', id);

    // Generate slug if title changed and slug not provided
    if (pageData.title && !pageData.slug) {
      pageData.slug = generateSlug(pageData.title);
    }

    // Add updated timestamp
    const updatedPage = {
      ...pageData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(pageRef, updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);

    // Fallback to mock data if there's an error
    if (error instanceof Error && error.message.includes('permission')) {
      console.warn('Permission error detected. Using mock data as fallback.');

      // Find the page in mock data
      const pageIndex = mockPages.findIndex(page => page.id === id);

      if (pageIndex === -1) {
        throw new Error(`Page with ID ${id} not found`);
      }

      // Generate slug if title changed and slug not provided
      if (pageData.title && !pageData.slug) {
        pageData.slug = generateSlug(pageData.title);
      }

      // Update the page in mock data
      mockPages[pageIndex] = {
        ...mockPages[pageIndex],
        ...pageData,
        lastUpdated: 'Just now'
      };

      return;
    }

    throw error;
  }
};

/**
 * Delete a page
 * @param id Page ID
 * @returns Promise resolving when the deletion is complete
 */
export const deletePage = async (id: string): Promise<void> => {
  try {
    const pageRef = doc(db, 'pages', id);
    await deleteDoc(pageRef);
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
};

/**
 * Get all announcements with optional filtering
 * @param options Optional filtering options
 * @returns Promise resolving to an array of announcements
 */
export const getAnnouncements = async (options?: { status?: string; search?: string }): Promise<Announcement[]> => {
  // Use mock data in development mode
  if (USE_MOCK_DATA) {
    console.log('Using mock data for getAnnouncements');
    let filteredAnnouncements = [...mockAnnouncements];

    // Apply status filter if provided
    if (options?.status && options.status !== 'all') {
      filteredAnnouncements = filteredAnnouncements.filter(announcement => announcement.status === options.status);
    }

    // Apply search filter if provided
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      filteredAnnouncements = filteredAnnouncements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.content.toLowerCase().includes(searchLower)
      );
    }

    return filteredAnnouncements;
  }

  // Use real Firebase data
  try {
    const announcementsRef = collection(db, 'announcements');
    const constraints: QueryConstraint[] = [];

    // Add status filter if provided
    if (options?.status && options.status !== 'all') {
      constraints.push(where('status', '==', options.status));
    }

    // Add ordering
    constraints.push(orderBy('publishDate', 'desc'));

    const q = query(announcementsRef, ...constraints);
    const querySnapshot = await getDocs(q);

    let announcements: Announcement[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Announcement;
      announcements.push({
        ...data,
        id: doc.id,
        publishDate: data.publishDate instanceof Timestamp
          ? formatDate(data.publishDate)
          : data.publishDate,
        expiryDate: data.expiryDate instanceof Timestamp
          ? formatDate(data.expiryDate)
          : data.expiryDate
      });
    });

    // Apply search filter if provided (client-side filtering)
    if (options?.search) {
      const searchLower = options.search.toLowerCase();
      announcements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.content.toLowerCase().includes(searchLower)
      );
    }

    return announcements;
  } catch (error) {
    console.error('Error getting announcements:', error);

    // Fallback to mock data if there's an error
    if (error instanceof Error && error.message.includes('permission')) {
      console.warn('Permission error detected. Using mock data as fallback.');
      return mockAnnouncements;
    }

    throw error;
  }
};

/**
 * Get a specific announcement by ID
 * @param id Announcement ID
 * @returns Promise resolving to the announcement data
 */
export const getAnnouncement = async (id: string): Promise<Announcement> => {
  try {
    const announcementRef = doc(db, 'announcements', id);
    const announcementSnap = await getDoc(announcementRef);

    if (!announcementSnap.exists()) {
      throw new Error(`Announcement with ID ${id} not found`);
    }

    const data = announcementSnap.data() as Announcement;
    return {
      ...data,
      id: announcementSnap.id,
      publishDate: data.publishDate instanceof Timestamp
        ? formatDate(data.publishDate)
        : data.publishDate,
      expiryDate: data.expiryDate instanceof Timestamp
        ? formatDate(data.expiryDate)
        : data.expiryDate
    };
  } catch (error) {
    console.error('Error getting announcement:', error);
    throw error;
  }
};

/**
 * Create a new announcement
 * @param announcementData Announcement data
 * @returns Promise resolving to the new announcement ID
 */
export const createAnnouncement = async (announcementData: Partial<Announcement>): Promise<string> => {
  try {
    const announcementsRef = collection(db, 'announcements');

    // Convert date strings to Timestamps if needed
    let publishDate = announcementData.publishDate;
    let expiryDate = announcementData.expiryDate;

    if (typeof publishDate === 'string') {
      publishDate = Timestamp.fromDate(new Date(publishDate));
    }

    if (typeof expiryDate === 'string') {
      expiryDate = Timestamp.fromDate(new Date(expiryDate));
    }

    // Add timestamps
    const newAnnouncement = {
      ...announcementData,
      publishDate,
      expiryDate,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(announcementsRef, newAnnouncement);
    return docRef.id;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

/**
 * Update an existing announcement
 * @param id Announcement ID
 * @param announcementData Updated announcement data
 * @returns Promise resolving when the update is complete
 */
export const updateAnnouncement = async (id: string, announcementData: Partial<Announcement>): Promise<void> => {
  try {
    const announcementRef = doc(db, 'announcements', id);

    // Convert date strings to Timestamps if needed
    let publishDate = announcementData.publishDate;
    let expiryDate = announcementData.expiryDate;

    if (typeof publishDate === 'string') {
      publishDate = Timestamp.fromDate(new Date(publishDate));
    }

    if (typeof expiryDate === 'string') {
      expiryDate = Timestamp.fromDate(new Date(expiryDate));
    }

    // Add updated timestamp
    const updatedAnnouncement = {
      ...announcementData,
      publishDate,
      expiryDate,
      updatedAt: serverTimestamp()
    };

    await updateDoc(announcementRef, updatedAnnouncement);
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

/**
 * Delete an announcement
 * @param id Announcement ID
 * @returns Promise resolving when the deletion is complete
 */
export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const announcementRef = doc(db, 'announcements', id);
    await deleteDoc(announcementRef);
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};

/**
 * Upload a content image
 * @param file File to upload
 * @param contentType Type of content (page, announcement)
 * @param contentId ID of the content item
 * @returns Promise resolving to the public URL of the uploaded image
 */
export const uploadContentImage = async (
  file: File,
  contentType: string,
  contentId?: string
): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${contentType}_${contentId || 'new'}_${Date.now()}.${fileExt}`;
    const filePath = `${contentType}/${fileName}`;

    // Upload to Supabase
    await uploadFile(
      BUCKETS.RESOURCES,
      filePath,
      file,
      { contentType, contentId }
    );

    // Get the public URL
    const publicUrl = getPublicUrl(
      BUCKETS.RESOURCES,
      filePath
    );

    return publicUrl;
  } catch (error) {
    console.error('Error uploading content image:', error);
    throw error;
  }
};

export default {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  uploadContentImage
};
