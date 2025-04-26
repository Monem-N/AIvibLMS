import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'Form/Select',
  component: Select,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
} as ComponentMeta<typeof Select>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  helperText: 'Please select your country of residence',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  error: 'Please select a country',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  fullWidth: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  size: 'large',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  variant: 'outlined',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  variant: 'filled',
};

export const Standard = Template.bind({});
Standard.args = {
  label: 'Country',
  options: countryOptions,
  placeholder: 'Select a country',
  variant: 'standard',
};

export const WithDisabledOptions = Template.bind({});
WithDisabledOptions.args = {
  label: 'Country',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'uk', label: 'United Kingdom', disabled: true },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany', disabled: true },
    { value: 'jp', label: 'Japan' },
  ],
  placeholder: 'Select a country',
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select
      label="Outlined Select"
      variant="outlined"
      options={countryOptions}
      placeholder="Outlined variant"
    />
    <Select
      label="Filled Select"
      variant="filled"
      options={countryOptions}
      placeholder="Filled variant"
    />
    <Select
      label="Standard Select"
      variant="standard"
      options={countryOptions}
      placeholder="Standard variant"
    />
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Select
      label="Small Select"
      size="small"
      options={countryOptions}
      placeholder="Small size"
    />
    <Select
      label="Medium Select"
      size="medium"
      options={countryOptions}
      placeholder="Medium size"
    />
    <Select
      label="Large Select"
      size="large"
      options={countryOptions}
      placeholder="Large size"
    />
  </div>
);

export const FormExample = () => {
  const [values, setValues] = useState({
    country: '',
    language: '',
  });
  
  const [errors, setErrors] = useState({
    country: '',
    language: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
    // Simple validation
    if (name === 'country' && !value) {
      setErrors({
        ...errors,
        country: 'Please select a country',
      });
    } else if (name === 'language' && !value) {
      setErrors({
        ...errors,
        language: 'Please select a language',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Select
        label="Country"
        name="country"
        options={countryOptions}
        placeholder="Select a country"
        value={values.country}
        onChange={handleChange}
        error={errors.country}
        required
      />
      <Select
        label="Language"
        name="language"
        options={[
          { value: 'en', label: 'English' },
          { value: 'fr', label: 'French' },
          { value: 'es', label: 'Spanish' },
          { value: 'de', label: 'German' },
          { value: 'ja', label: 'Japanese' },
        ]}
        placeholder="Select a language"
        value={values.language}
        onChange={handleChange}
        error={errors.language}
        required
      />
      <button type="submit" disabled={!values.country || !values.language}>
        Submit
      </button>
    </form>
  );
};
