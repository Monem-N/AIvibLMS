import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Remember me',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  label: 'Subscribe to newsletter',
  helperText: 'You can unsubscribe at any time',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Accept terms and conditions',
  error: 'You must accept the terms and conditions',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Accept terms and conditions',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled checkbox',
  disabled: true,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked checkbox',
  defaultChecked: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  label: 'Indeterminate checkbox',
  indeterminate: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small checkbox',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Medium checkbox',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large checkbox',
  size: 'large',
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Outlined checkbox',
  variant: 'outlined',
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Filled checkbox',
  variant: 'filled',
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox
      label="Outlined Checkbox"
      variant="outlined"
    />
    <Checkbox
      label="Filled Checkbox"
      variant="filled"
    />
  </div>
);

export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox
      label="Small Checkbox"
      size="small"
    />
    <Checkbox
      label="Medium Checkbox"
      size="medium"
    />
    <Checkbox
      label="Large Checkbox"
      size="large"
    />
  </div>
);

export const AllStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Checkbox
      label="Unchecked"
    />
    <Checkbox
      label="Checked"
      defaultChecked
    />
    <Checkbox
      label="Indeterminate"
      indeterminate
    />
    <Checkbox
      label="Disabled"
      disabled
    />
    <Checkbox
      label="Disabled and Checked"
      disabled
      defaultChecked
    />
    <Checkbox
      label="With Error"
      error="Error message"
    />
  </div>
);

export const CheckboxGroup = () => {
  const [selected, setSelected] = useState(['option1']);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    let newSelected;
    if (checked) {
      newSelected = [...selected, value];
    } else {
      newSelected = selected.filter(item => item !== value);
    }
    
    setSelected(newSelected);
    
    // Update select all state
    if (newSelected.length === options.length) {
      setSelectAll(true);
      setIndeterminate(false);
    } else if (newSelected.length === 0) {
      setSelectAll(false);
      setIndeterminate(false);
    } else {
      setSelectAll(false);
      setIndeterminate(true);
    }
  };
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    
    if (checked) {
      setSelected(options.map(option => option.value));
      setSelectAll(true);
      setIndeterminate(false);
    } else {
      setSelected([]);
      setSelectAll(false);
      setIndeterminate(false);
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Checkbox
        label="Select All"
        checked={selectAll}
        indeterminate={indeterminate}
        onChange={handleSelectAll}
      />
      <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map(option => (
          <Checkbox
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={handleChange}
          />
        ))}
      </div>
      <div style={{ marginTop: '16px' }}>
        Selected options: {selected.join(', ')}
      </div>
    </div>
  );
};

export const FormExample = () => {
  const [values, setValues] = useState({
    terms: false,
    newsletter: false,
    preferences: {
      email: false,
      sms: false,
      push: false,
    },
  });
  
  const [errors, setErrors] = useState({
    terms: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setValues({
        ...values,
        [parent]: {
          ...values[parent as keyof typeof values] as Record<string, boolean>,
          [child]: checked,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: checked,
      });
      
      // Simple validation
      if (name === 'terms' && !checked) {
        setErrors({
          ...errors,
          terms: 'You must accept the terms and conditions',
        });
      } else if (name === 'terms') {
        setErrors({
          ...errors,
          terms: '',
        });
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!values.terms) {
      setErrors({
        ...errors,
        terms: 'You must accept the terms and conditions',
      });
      return;
    }
    
    alert('Form submitted successfully!');
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <h3>Preferences</h3>
        <Checkbox
          label="Email notifications"
          name="preferences.email"
          checked={values.preferences.email}
          onChange={handleChange}
        />
        <Checkbox
          label="SMS notifications"
          name="preferences.sms"
          checked={values.preferences.sms}
          onChange={handleChange}
        />
        <Checkbox
          label="Push notifications"
          name="preferences.push"
          checked={values.preferences.push}
          onChange={handleChange}
        />
      </div>
      
      <Checkbox
        label="Subscribe to newsletter"
        name="newsletter"
        checked={values.newsletter}
        onChange={handleChange}
        helperText="You can unsubscribe at any time"
      />
      
      <Checkbox
        label="I accept the terms and conditions"
        name="terms"
        checked={values.terms}
        onChange={handleChange}
        error={errors.terms}
        required
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};
