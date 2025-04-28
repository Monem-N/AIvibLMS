/**
 * ContentEditor Component
 *
 * A modal dialog component for creating and editing content such as pages and announcements.
 * This component uses a modular architecture with separate components for each tab.
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Page, Announcement } from '../../services/contentService';
import { useAuth } from '../../hooks/useAuth';
import { useContentForm } from '../../hooks/useContentForm';
import { contentImageService } from '../../services/contentImageService';

// Tab Components
import TabPanel from './content/TabPanel';
import ContentTab from './content/ContentTab';
import SettingsTab from './content/SettingsTab';
import SEOTab from './content/SEOTab';

// Content Editor Props
interface ContentEditorProps {
  contentType: 'page' | 'announcement';
  content: Page | Announcement | null;
  onSave: (content: Page | Announcement) => Promise<void>;
  onCancel: () => void;
  open: boolean;
}

// Content Editor Component
const ContentEditor: React.FC<ContentEditorProps> = ({
  contentType,
  content,
  onSave,
  onCancel,
  open
}) => {
  // UI state
  const [activeTab, setActiveTab] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  // Get form state and handlers from custom hook
  const {
    formData,
    errors,
    isSubmitting,
    errorMessage,
    showErrorSnackbar,
    setIsSubmitting,
    setErrorMessage,
    setShowErrorSnackbar,
    handleChange,
    handleEditorChange,
    handleAudienceChange,
    updateFeaturedImage,
    insertImageIntoContent,
    validateForm
  } = useContentForm({
    contentType,
    initialContent: content
  });

  const { user } = useAuth();

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    await contentImageService.uploadImage(
      file,
      contentType,
      content?.id,
      (imageUrl) => {
        if (contentType === 'page') {
          updateFeaturedImage(imageUrl);
        } else {
          insertImageIntoContent(imageUrl);
        }
      },
      (error) => {
        setErrorMessage(`Failed to upload image: ${error.message}`);
        setShowErrorSnackbar(true);
      },
      () => setUploading(true),
      () => setUploading(false)
    );
  };

  // Handle form submission
  const handleSave = async () => {
    console.log('Attempting to save content...');
    
    // Validate form
    const isValid = await validateForm();
    if (!isValid) {
      console.log('Form validation failed:', errors);
      return;
    }
    
    console.log('Form validation passed, proceeding with save');
    setIsSubmitting(true);
    
    try {
      if (contentType === 'page') {
        console.log('Saving page content');
        const pageData: Partial<Page> = {
          title: formData.title,
          content: formData.content,
          status: formData.status as 'published' | 'draft',
          featuredImage: formData.featuredImage,
          author: user?.displayName || 'Unknown User',
          authorId: user?.uid || 'unknown',
          // Include SEO fields
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          keywords: formData.keywords
        };
        
        if (content?.id) {
          pageData.id = content.id;
        }
        
        console.log('Page data to save:', pageData);
        await onSave(pageData as Page);
        console.log('Page saved successfully');
      } else {
        console.log('Saving announcement content');
        const announcementData: Partial<Announcement> = {
          title: formData.title,
          content: formData.content,
          status: formData.status as 'active' | 'scheduled' | 'expired',
          publishDate: formData.publishDate,
          expiryDate: formData.expiryDate,
          audience: formData.audience,
          author: user?.displayName || 'Unknown User',
          authorId: user?.uid || 'unknown'
        };
        
        if (content?.id) {
          announcementData.id = content.id;
        }
        
        console.log('Announcement data to save:', announcementData);
        await onSave(announcementData as Announcement);
        console.log('Announcement saved successfully');
      }
      
      // Show success message
      setErrorMessage(null);
      onCancel();
    } catch (error) {
      console.error('Error saving content:', error);
      
      // Show error message
      setErrorMessage('Failed to save content. Please try again.');
      setShowErrorSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="md"
      fullWidth
      aria-labelledby="content-editor-title"
    >
      <DialogTitle id="content-editor-title">
        {content ? `Edit ${contentType}` : `Create new ${contentType}`}
      </DialogTitle>

      <DialogContent dividers>
        {/* Error message */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        
        <Box sx={{ mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            aria-label="content editor tabs"
          >
            <Tab label="Content" id="content-tab-0" aria-controls="content-tabpanel-0" />
            <Tab label="Settings" id="content-tab-1" aria-controls="content-tabpanel-1" />
            {contentType === 'page' && (
              <Tab label="SEO" id="content-tab-2" aria-controls="content-tabpanel-2" />
            )}
          </Tabs>
        </Box>

        {/* Content Tab */}
        <TabPanel value={activeTab} index={0}>
          <ContentTab
            title={formData.title}
            content={formData.content}
            titleError={errors.title}
            contentError={errors.content}
            onTitleChange={handleChange}
            onContentChange={handleEditorChange}
          />
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={activeTab} index={1}>
          <SettingsTab
            contentType={contentType}
            status={formData.status}
            publishDate={formData.publishDate}
            expiryDate={formData.expiryDate}
            audience={formData.audience}
            featuredImage={formData.featuredImage}
            statusError={errors.status}
            publishDateError={errors.publishDate}
            expiryDateError={errors.expiryDate}
            audienceError={errors.audience}
            uploading={uploading}
            onStatusChange={handleChange}
            onPublishDateChange={handleChange}
            onExpiryDateChange={handleChange}
            onAudienceChange={(values) => {
              handleAudienceChange({ target: { name: 'audience', value: values } });
            }}
            onImageUpload={handleImageUpload}
          />
        </TabPanel>

        {/* SEO Tab (Pages only) */}
        {contentType === 'page' && (
          <TabPanel value={activeTab} index={2}>
            <SEOTab
              metaTitle={formData.metaTitle}
              metaDescription={formData.metaDescription}
              keywords={formData.keywords}
              metaTitleError={errors.metaTitle}
              metaDescriptionError={errors.metaDescription}
              keywordsError={errors.keywords}
              onMetaTitleChange={handleChange}
              onMetaDescriptionChange={handleChange}
              onKeywordsChange={handleChange}
            />
          </TabPanel>
        )}
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={onCancel} 
          disabled={isSubmitting}
          aria-label="Cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          aria-label="Save content"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
      
      {/* Error Snackbar */}
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowErrorSnackbar(false)}
        message={errorMessage}
      />
    </Dialog>
  );
};

export default ContentEditor;
