/**
 * DashboardWidget Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardWidget from '../DashboardWidget';

describe('DashboardWidget Component', () => {
  it('renders without crashing', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the widget is rendered
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
  });
  
  it('renders the title correctly', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the title is rendered
    const title = screen.getByText('Test Widget');
    expect(title).toBeInTheDocument();
  });
  
  it('renders children correctly', () => {
    render(
      <DashboardWidget title="Test Widget">
        <div data-testid="test-content">Test Content</div>
      </DashboardWidget>
    );
    
    // Check if the children are rendered
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test Content');
  });
  
  it('applies custom color to the header', () => {
    render(<DashboardWidget title="Test Widget" color="#ff0000" />);
    
    // Check if the color is applied to the header
    const header = screen.getByText('Test Widget').closest('.widget-header');
    expect(header).toHaveStyle('border-top-color: #ff0000');
  });
  
  it('applies custom className', () => {
    render(<DashboardWidget title="Test Widget" className="custom-class" />);
    
    // Check if the custom class is applied
    const widget = screen.getByText('Test Widget').closest('.dashboard-widget');
    expect(widget).toHaveClass('custom-class');
  });
  
  it('renders loading state correctly', () => {
    render(<DashboardWidget title="Test Widget" loading={true} />);
    
    // Check if the loading state is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Check if the spinner is rendered
    const spinner = screen.getByText('Loading...').previousSibling;
    expect(spinner).toHaveClass('widget-spinner');
  });
  
  it('renders error state correctly', () => {
    const errorMessage = 'Test Error';
    render(<DashboardWidget title="Test Widget" error={errorMessage} />);
    
    // Check if the error state is rendered
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    // Check if the error icon is rendered
    const errorIcon = screen.getByText(errorMessage).previousSibling;
    expect(errorIcon).toHaveClass('error-icon');
  });
  
  it('calls onRefresh when refresh button is clicked', () => {
    const handleRefresh = jest.fn();
    render(<DashboardWidget title="Test Widget" onRefresh={handleRefresh} />);
    
    // Check if the refresh button is rendered
    const refreshButton = screen.getByRole('button', { name: 'Refresh widget' });
    expect(refreshButton).toBeInTheDocument();
    
    // Click the refresh button
    fireEvent.click(refreshButton);
    
    // Check if onRefresh is called
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });
  
  it('does not render refresh button when onRefresh is not provided', () => {
    render(<DashboardWidget title="Test Widget" />);
    
    // Check if the refresh button is not rendered
    const refreshButton = screen.queryByRole('button', { name: 'Refresh widget' });
    expect(refreshButton).not.toBeInTheDocument();
  });
  
  it('renders footer correctly', () => {
    const footer = <div data-testid="test-footer">Test Footer</div>;
    render(<DashboardWidget title="Test Widget" footer={footer} />);
    
    // Check if the footer is rendered
    const footerElement = screen.getByTestId('test-footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent('Test Footer');
  });
  
  it('prioritizes loading state over error state', () => {
    render(
      <DashboardWidget 
        title="Test Widget" 
        loading={true} 
        error="Test Error" 
      />
    );
    
    // Check if the loading state is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Check if the error state is not rendered
    expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
  });
  
  it('prioritizes loading and error states over children', () => {
    render(
      <DashboardWidget 
        title="Test Widget" 
        loading={true} 
        error="Test Error"
      >
        <div data-testid="test-content">Test Content</div>
      </DashboardWidget>
    );
    
    // Check if the loading state is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Check if the children are not rendered
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    
    // Check if the error state is not rendered
    expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
  });
});
