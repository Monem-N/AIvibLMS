import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';

export default {
  title: 'Form/Input',
  component: Input,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Username',
  placeholder: 'Enter your username',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
  helperText: "We'll never share your email with anyone else",
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
  error: 'Please enter a valid email address',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Full Name',
  placeholder: 'Enter your full name',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'This input is disabled',
  disabled: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  label: 'Message',
  placeholder: 'Type your message here',
  fullWidth: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Input',
  placeholder: 'Small size',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium Input',
  placeholder: 'Medium size',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Input',
  placeholder: 'Large size',
  size: 'large',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Outlined Input',
  placeholder: 'Outlined variant',
  variant: 'outlined',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Filled Input',
  placeholder: 'Filled variant',
  variant: 'filled',
};

export const Standard = Template.bind({});
Standard.args = {
  label: 'Standard Input',
  placeholder: 'Standard variant',
  variant: 'standard',
};

export const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      endIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      }
    />
  );
};

export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      label="Search"
      placeholder="Search..."
      startIcon={<span>🔍</span>}
    />
    <Input
      label="Calendar"
      placeholder="Select a date"
      endIcon={<span>📅</span>}
    />
    <Input
      label="Location"
      placeholder="Enter your location"
      startIcon={<span>📍</span>}
      endIcon={<span>🔍</span>}
    />
  </div>
);

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      label="Outlined Input"
      variant="outlined"
      placeholder="Outlined variant"
    />
    <Input
      label="Filled Input"
      variant="filled"
      placeholder="Filled variant"
    />
    <Input
      label="Standard Input"
      variant="standard"
      placeholder="Standard variant"
    />
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      label="Small Input"
      size="small"
      placeholder="Small size"
    />
    <Input
      label="Medium Input"
      size="medium"
      placeholder="Medium size"
    />
    <Input
      label="Large Input"
      size="large"
      placeholder="Large size"
    />
  </div>
);

export const FormExample = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
    // Simple validation
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address',
      });
    } else if (name === 'password' && value && value.length < 8) {
      setErrors({
        ...errors,
        password: 'Password must be at least 8 characters',
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
      <Input
        label="First Name"
        name="firstName"
        placeholder="Enter your first name"
        value={values.firstName}
        onChange={handleChange}
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        placeholder="Enter your last name"
        value={values.lastName}
        onChange={handleChange}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        helperText={!errors.email ? "We'll never share your email with anyone else" : undefined}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        helperText={!errors.password ? "Password must be at least 8 characters" : undefined}
        required
      />
      <button type="submit" disabled={Object.values(errors).some(error => !!error)}>
        Submit
      </button>
    </form>
  );
};
