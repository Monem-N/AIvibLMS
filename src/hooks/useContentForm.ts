import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Page, Announcement } from '../services/contentService';

// Constants
export const AUDIENCE_OPTIONS = ['All Users', 'Students', 'Instructors', 'Administrators'];
export const PAGE_STATUSES = ['draft', 'published'];
export const ANNOUNCEMENT_STATUSES = ['active', 'scheduled', 'expired'];
export const DEFAULT_EXPIRY_DAYS = 7;

// Form data interface
export interface ContentFormData {
  title: string;
  content: string;
  status: string;
  featuredImage: string;
  publishDate: string;
  expiryDate: string;
  audience: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

// Form errors interface
export interface ContentFormErrors {
  title?: string;
  content?: string;
  status?: string;
  publishDate?: string;
  expiryDate?: string;
  audience?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  general?: string;
}

// Get validation schema based on content type
export const getValidationSchema = (contentType: 'page' | 'announcement') => {
  // Common validation rules
  const baseSchema = {
    title: yup.string().required('Title is required').max(255, 'Title must be less than 255 characters'),
    content: yup.string().required('Content is required'),
    status: yup.string().required('Status is required')
  };

  if (contentType === 'page') {
    return yup.object().shape({
      ...baseSchema,
      featuredImage: yup.string(),
      metaTitle: yup.string().max(60, 'Meta title should be less than 60 characters'),
      metaDescription: yup.string().max(160, 'Meta description should be less than 160 characters'),
      keywords: yup.string()
    });
  } else {
    return yup.object().shape({
      ...baseSchema,
      publishDate: yup.date().required('Publish date is required'),
      expiryDate: yup.date()
        .required('Expiry date is required')
        .min(
          yup.ref('publishDate'),
          'Expiry date must be after publish date'
        ),
      audience: yup.array().of(yup.string()).min(1, 'At least one audience must be selected')
    });
  }
};

// Get initial form data
export const getInitialFormData = (contentType: 'page' | 'announcement'): ContentFormData => ({
  title: '',
  content: '',
  status: contentType === 'page' ? 'draft' : 'scheduled',
  featuredImage: '',
  publishDate: new Date().toISOString().split('T')[0],
  expiryDate: new Date(Date.now() + DEFAULT_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  audience: ['All Users'],
  metaTitle: '',
  metaDescription: '',
  keywords: ''
});

interface UseContentFormProps {
  contentType: 'page' | 'announcement';
  initialContent: Page | Announcement | null;
}

export const useContentForm = ({ contentType, initialContent }: UseContentFormProps) => {
  // Form state
  const [formData, setFormData] = useState<ContentFormData>(getInitialFormData(contentType));
  const [errors, setErrors] = useState<ContentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);

  // Initialize form with content data if editing
  useEffect(() => {
    if (initialContent) {
      console.log('Initializing form with content:', initialContent);
      
      // Common fields
      const newFormData: ContentFormData = {
        ...getInitialFormData(contentType),
        title: initialContent.title,
        content: initialContent.content,
        status: initialContent.status
      };

      // Page-specific fields
      if (contentType === 'page') {
        const page = initialContent as Page;
        newFormData.featuredImage = page.featuredImage || '';
        newFormData.metaTitle = page.metaTitle || '';
        newFormData.metaDescription = page.metaDescription || '';
        newFormData.keywords = page.keywords || '';
      }

      // Announcement-specific fields
      if (contentType === 'announcement') {
        const announcement = initialContent as Announcement;
        newFormData.publishDate = typeof announcement.publishDate === 'string'
          ? announcement.publishDate
          : announcement.publishDate?.toDate?.().toISOString().split('T')[0] || newFormData.publishDate;
        
        newFormData.expiryDate = typeof announcement.expiryDate === 'string'
          ? announcement.expiryDate
          : announcement.expiryDate?.toDate?.().toISOString().split('T')[0] || newFormData.expiryDate;
        
        newFormData.audience = announcement.audience || ['All Users'];
      }

      setFormData(newFormData);
    } else {
      // Reset form for new content
      setFormData(getInitialFormData(contentType));
    }
    
    // Reset errors and UI state
    setErrors({});
    setErrorMessage(null);
    setShowErrorSnackbar(false);
  }, [initialContent, contentType]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name?: string; value: unknown } }) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle rich text editor changes
  const handleEditorChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };
  
  // Handle audience selection
  const handleAudienceChange = (event: any) => {
    const values = event.target.value as string[];
    
    // If "All Users" is selected, deselect other options
    if (values.includes('All Users') && values.length > 1) {
      if (formData.audience.includes('All Users')) {
        // If "All Users" was already selected, keep only the other selections
        setFormData(prev => ({
          ...prev,
          audience: values.filter(v => v !== 'All Users')
        }));
      } else {
        // If "All Users" was just selected, make it the only selection
        setFormData(prev => ({
          ...prev,
          audience: ['All Users']
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        audience: values
      }));
    }
  };

  // Update featured image
  const updateFeaturedImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: imageUrl
    }));
  };

  // Insert image into content
  const insertImageIntoContent = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      content: `${prev.content}\n<img src="${imageUrl}" alt="Uploaded image" />`
    }));
  };

  // Validate form using Yup schema
  const validateForm = async (): Promise<boolean> => {
    try {
      // Get the validation schema based on content type
      const schema = getValidationSchema(contentType);
      
      // Validate the form data
      await schema.validate(formData, { abortEarly: false });
      
      // Clear errors if validation passes
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Transform Yup errors into our error format
        const validationErrors: ContentFormErrors = {};
        
        error.inner.forEach(err => {
          if (err.path) {
            validationErrors[err.path as keyof ContentFormErrors] = err.message;
          }
        });
        
        // Set errors
        setErrors(validationErrors);
      } else {
        // Handle unexpected errors
        setErrorMessage('An unexpected error occurred during validation');
        setShowErrorSnackbar(true);
      }
      
      return false;
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    errorMessage,
    showErrorSnackbar,
    setFormData,
    setErrors,
    setIsSubmitting,
    setErrorMessage,
    setShowErrorSnackbar,
    handleChange,
    handleEditorChange,
    handleAudienceChange,
    updateFeaturedImage,
    insertImageIntoContent,
    validateForm
  };
};
