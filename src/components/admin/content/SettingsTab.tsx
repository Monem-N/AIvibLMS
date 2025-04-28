import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { AUDIENCE_OPTIONS, PAGE_STATUSES, ANNOUNCEMENT_STATUSES } from '../../../hooks/useContentForm';
import AudienceSelector from './AudienceSelector';
import ImageUploader from './ImageUploader';

interface SettingsTabProps {
  contentType: 'page' | 'announcement';
  status: string;
  publishDate?: string;
  expiryDate?: string;
  audience?: string[];
  featuredImage?: string;
  statusError?: string;
  publishDateError?: string;
  expiryDateError?: string;
  audienceError?: string;
  uploading?: boolean;
  onStatusChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  onPublishDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExpiryDateChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAudienceChange?: (values: string[]) => void;
  onImageUpload?: (file: File) => Promise<void>;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  contentType,
  status,
  publishDate,
  expiryDate,
  audience = [],
  featuredImage,
  statusError,
  publishDateError,
  expiryDateError,
  audienceError,
  uploading = false,
  onStatusChange,
  onPublishDateChange,
  onExpiryDateChange,
  onAudienceChange,
  onImageUpload
}) => {
  return (
    <Box>
      <FormControl fullWidth margin="normal" error={!!statusError}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={status}
          onChange={onStatusChange}
          label="Status"
          required
        >
          {contentType === 'page' && PAGE_STATUSES.map(status => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
          
          {contentType === 'announcement' && ANNOUNCEMENT_STATUSES.map(status => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </Select>
        {statusError && (
          <FormHelperText>{statusError}</FormHelperText>
        )}
      </FormControl>

      {contentType === 'page' && onImageUpload && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Featured Image
          </Typography>
          <ImageUploader 
            onUpload={onImageUpload} 
            uploading={uploading} 
            currentImage={featuredImage}
          />
        </Box>
      )}

      {contentType === 'announcement' && onPublishDateChange && onExpiryDateChange && onAudienceChange && (
        <>
          <TextField
            name="publishDate"
            label="Publish Date"
            type="date"
            fullWidth
            margin="normal"
            value={publishDate}
            onChange={onPublishDateChange}
            InputLabelProps={{ shrink: true }}
            error={!!publishDateError}
            helperText={publishDateError}
            required
          />

          <TextField
            name="expiryDate"
            label="Expiry Date"
            type="date"
            fullWidth
            margin="normal"
            value={expiryDate}
            onChange={onExpiryDateChange}
            InputLabelProps={{ shrink: true }}
            error={!!expiryDateError}
            helperText={expiryDateError}
            required
          />

          <AudienceSelector
            selectedAudiences={audience}
            onChange={onAudienceChange}
            error={audienceError}
          />
        </>
      )}
    </Box>
  );
};

export default SettingsTab;
