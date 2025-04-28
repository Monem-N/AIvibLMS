import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText
} from '@mui/material';
import TiptapEditor from '../../common/TiptapEditor';
import DOMPurify from 'dompurify';

// Content Preview Component
const ContentPreview: React.FC<{ content: string }> = ({ content }) => {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);
  
  return (
    <Box 
      sx={(theme) => ({ 
        border: `1px solid ${theme.palette.divider}`, 
        borderRadius: theme.shape.borderRadius, 
        p: 2, 
        minHeight: theme.spacing(37.5), // 300px
        maxHeight: theme.spacing(62.5), // 500px
        overflow: 'auto'
      })}
    >
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </Box>
  );
};

interface ContentTabProps {
  title: string;
  content: string;
  titleError?: string;
  contentError?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (content: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({
  title,
  content,
  titleError,
  contentError,
  onTitleChange,
  onContentChange
}) => {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <Box>
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={onTitleChange}
        error={!!titleError}
        helperText={titleError}
        required
        inputProps={{ maxLength: 255 }}
      />

      <Box sx={{ mt: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1">Content</Typography>
          <Button 
            size="small" 
            onClick={() => setPreviewMode(!previewMode)}
            aria-label={previewMode ? "Edit content" : "Preview content"}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </Box>

        {previewMode ? (
          <ContentPreview content={content} />
        ) : (
          <>
            <Box>
              <TiptapEditor
                content={content}
                onChange={onContentChange}
                placeholder="Start writing your content here..."
              />
            </Box>
            {contentError && (
              <FormHelperText error>{contentError}</FormHelperText>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContentTab;
