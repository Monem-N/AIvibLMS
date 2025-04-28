import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { AUDIENCE_OPTIONS } from '../../../hooks/useContentForm';

interface AudienceSelectorProps {
  selectedAudiences: string[];
  onChange: (values: string[]) => void;
  error?: string;
}

const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudiences,
  onChange,
  error
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const values = event.target.value as string[];
    
    // If "All Users" is selected, deselect other options
    if (values.includes('All Users') && values.length > 1) {
      if (selectedAudiences.includes('All Users')) {
        // If "All Users" was already selected, keep only the other selections
        onChange(values.filter(v => v !== 'All Users'));
      } else {
        // If "All Users" was just selected, make it the only selection
        onChange(['All Users']);
      }
    } else {
      onChange(values);
    }
  };

  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      <InputLabel id="audience-label">Audience</InputLabel>
      <Select
        labelId="audience-label"
        name="audience"
        multiple
        value={selectedAudiences}
        onChange={handleChange}
        label="Audience"
        required
      >
        {AUDIENCE_OPTIONS.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AudienceSelector;
