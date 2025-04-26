import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardWidget from '../DashboardWidget';

describe('DashboardWidget Component', () => {
  it('renders without crashing', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the widget is rendered
    const widget = screen.getByText('Test Widget').closest('.dashboard-widget');
    expect(widget).toBeInTheDocument();
  });
  
  it('renders the title correctly', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the title is rendered
    const title = screen.getByText('Test Widget');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('widget-title');
  });
  
  it('renders children correctly', () => {
    render(
      <DashboardWidget title="Test Widget">
        <p>Test Content</p>
      </DashboardWidget>
    );
    
    // Check if the children are rendered
    const content = screen.getByText('Test Content');
    expect(content).toBeInTheDocument();
  });
  
  it('applies custom color to the header', () => {
    render(<DashboardWidget title="Test Widget" color="#ff0000" />);
    
    // Check if the color is applied to the header
    const header = screen.getByText('Test Widget').closest('.widget-header');
    expect(header).toHaveStyle('border-top-color: #ff0000');
  });
  
  it('applies custom class name', () => {
    render(<DashboardWidget title="Test Widget" className="custom-class" />);
    
    // Check if the custom class is applied
    const widget = screen.getByText('Test Widget').closest('.dashboard-widget');
    expect(widget).toHaveClass('custom-class');
  });
  
  it('renders loading state correctly', () => {
    render(<DashboardWidget title="Test Widget" loading={true} />);
    
    // Check if the loading state is rendered
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    
    // Check if the spinner is rendered
    const spinner = loading.previousSibling;
    expect(spinner).toHaveClass('widget-spinner');
  });
  
  it('renders error state correctly', () => {
    render(<DashboardWidget title="Test Widget" error="Test Error" />);
    
    // Check if the error state is rendered
    const error = screen.getByText('Test Error');
    expect(error).toBeInTheDocument();
    
    // Check if the error icon is rendered
    const errorIcon = error.previousSibling;
    expect(errorIcon).toBeInTheDocument();
  });
  
  it('calls onRefresh when refresh button is clicked', () => {
    const mockOnRefresh = jest.fn();
    
    render(<DashboardWidget title="Test Widget" onRefresh={mockOnRefresh} />);
    
    // Check if the refresh button is rendered
    const refreshButton = screen.getByRole('button', { name: 'Refresh widget' });
    expect(refreshButton).toBeInTheDocument();
    
    // Click the refresh button
    fireEvent.click(refreshButton);
    
    // Check if onRefresh is called
    expect(mockOnRefresh).toHaveBeenCalled();
  });
  
  it('does not render refresh button when onRefresh is not provided', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the refresh button is not rendered
    const refreshButton = screen.queryByRole('button', { name: 'Refresh widget' });
    expect(refreshButton).not.toBeInTheDocument();
  });
  
  it('prioritizes loading state over error state', () => {
    render(<DashboardWidget title="Test Widget" loading={true} error="Test Error" />);
    
    // Check if the loading state is rendered
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    
    // Check if the error state is not rendered
    const error = screen.queryByText('Test Error');
    expect(error).not.toBeInTheDocument();
  });
  
  it('prioritizes loading and error states over children', () => {
    render(
      <DashboardWidget title="Test Widget" loading={true} error="Test Error">
        <p>Test Content</p>
      </DashboardWidget>
    );
    
    // Check if the loading state is rendered
    const loading = screen.getByText('Loading...');
    expect(loading).toBeInTheDocument();
    
    // Check if the children are not rendered
    const content = screen.queryByText('Test Content');
    expect(content).not.toBeInTheDocument();
  });
});
