import React from 'react';
import {
  Box,
  TextField
} from '@mui/material';

interface SEOTabProps {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaTitleError?: string;
  metaDescriptionError?: string;
  keywordsError?: string;
  onMetaTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMetaDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeywordsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SEOTab: React.FC<SEOTabProps> = ({
  metaTitle,
  metaDescription,
  keywords,
  metaTitleError,
  metaDescriptionError,
  keywordsError,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onKeywordsChange
}) => {
  return (
    <Box>
      <TextField
        name="metaTitle"
        label="Meta Title"
        fullWidth
        margin="normal"
        placeholder="Leave blank to use page title"
        value={metaTitle}
        onChange={onMetaTitleChange}
        error={!!metaTitleError}
        helperText={metaTitleError}
        inputProps={{ maxLength: 60 }}
      />

      <TextField
        name="metaDescription"
        label="Meta Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={metaDescription}
        onChange={onMetaDescriptionChange}
        error={!!metaDescriptionError}
        helperText={metaDescriptionError}
        inputProps={{ maxLength: 160 }}
      />

      <TextField
        name="keywords"
        label="Keywords"
        fullWidth
        margin="normal"
        placeholder="Comma-separated keywords"
        value={keywords}
        onChange={onKeywordsChange}
        error={!!keywordsError}
        helperText={keywordsError}
      />
    </Box>
  );
};

export default SEOTab;
