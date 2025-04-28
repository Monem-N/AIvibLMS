/**
 * Content Management Tests
 * 
 * Tests for the Content Management feature.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContentManagement from '../pages/admin/ContentManagement';
import ContentEditor from '../components/admin/ContentEditor';
import * as contentService from '../services/contentService';

// Mock the content service
jest.mock('../services/contentService', () => ({
  getPages: jest.fn(),
  getAnnouncements: jest.fn(),
  createPage: jest.fn(),
  updatePage: jest.fn(),
  deletePage: jest.fn(),
  createAnnouncement: jest.fn(),
  updateAnnouncement: jest.fn(),
  deleteAnnouncement: jest.fn(),
  uploadContentImage: jest.fn()
}));

// Mock the useNotification hook
jest.mock('../hooks/useNotification', () => ({
  useNotification: () => ({
    showNotification: jest.fn()
  })
}));

// Mock the useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: {
      uid: 'test-user-id',
      displayName: 'Test User'
    }
  })
}));

describe('ContentManagement Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock data
    const mockPages = [
      { 
        id: 'page1', 
        title: 'Home Page', 
        slug: 'home', 
        status: 'published', 
        lastUpdated: '2023-05-15', 
        author: 'Admin',
        content: '<p>Welcome to our site</p>'
      },
      { 
        id: 'page2', 
        title: 'About Us', 
        slug: 'about', 
        status: 'draft', 
        lastUpdated: '2023-04-20', 
        author: 'Admin',
        content: '<p>About our company</p>'
      }
    ];
    
    const mockAnnouncements = [
      { 
        id: 'announcement1', 
        title: 'System Maintenance', 
        status: 'active', 
        publishDate: '2023-06-10', 
        expiryDate: '2023-06-15', 
        audience: ['All Users'],
        content: '<p>System will be down for maintenance</p>'
      }
    ];
    
    // Setup mocks
    (contentService.getPages as jest.Mock).mockResolvedValue(mockPages);
    (contentService.getAnnouncements as jest.Mock).mockResolvedValue(mockAnnouncements);
  });
  
  test('renders content management component', async () => {
    render(<ContentManagement />);
    
    // Check if the component renders
    expect(screen.getByText('Content Management')).toBeInTheDocument();
    
    // Check if tabs are rendered
    expect(screen.getByText('Pages')).toBeInTheDocument();
    expect(screen.getByText('Announcements')).toBeInTheDocument();
    
    // Check if pages are loaded
    await waitFor(() => {
      expect(contentService.getPages).toHaveBeenCalled();
      expect(screen.getByText('Home Page')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
    });
  });
  
  test('switches between tabs', async () => {
    render(<ContentManagement />);
    
    // Check if pages tab is active by default
    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
    
    // Switch to announcements tab
    fireEvent.click(screen.getByText('Announcements'));
    
    // Check if announcements are loaded
    await waitFor(() => {
      expect(contentService.getAnnouncements).toHaveBeenCalled();
      expect(screen.getByText('System Maintenance')).toBeInTheDocument();
    });
  });
  
  test('filters content by search term', async () => {
    render(<ContentManagement />);
    
    // Wait for pages to load
    await waitFor(() => {
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
    
    // Enter search term
    const searchInput = screen.getByPlaceholderText('Search content...');
    fireEvent.change(searchInput, { target: { value: 'Home' } });
    
    // Check if search is triggered
    await waitFor(() => {
      expect(contentService.getPages).toHaveBeenCalledWith(expect.objectContaining({
        search: 'Home'
      }));
    });
  });
});

describe('ContentEditor Component', () => {
  test('renders content editor for new page', () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();
    
    render(
      <ContentEditor
        contentType="page"
        content={null}
        onSave={handleSave}
        onCancel={handleCancel}
        open={true}
      />
    );
    
    // Check if the component renders
    expect(screen.getByText('Create new page')).toBeInTheDocument();
    
    // Check if form fields are rendered
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
  
  test('renders content editor for existing page', () => {
    const handleSave = jest.fn();
    const handleCancel = jest.fn();
    const existingPage = {
      id: 'page1',
      title: 'Existing Page',
      slug: 'existing-page',
      content: '<p>This is an existing page</p>',
      status: 'published',
      author: 'Admin',
      authorId: 'admin-id'
    };
    
    render(
      <ContentEditor
        contentType="page"
        content={existingPage}
        onSave={handleSave}
        onCancel={handleCancel}
        open={true}
      />
    );
    
    // Check if the component renders
    expect(screen.getByText('Edit page')).toBeInTheDocument();
    
    // Check if form fields are populated
    expect(screen.getByLabelText('Title')).toHaveValue('Existing Page');
  });
});
