import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../Breadcrumbs';

// Mock the useSelector hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Breadcrumbs Component', () => {
  const mockLocation = { pathname: '/courses/123' };
  
  beforeEach(() => {
    // Reset the mock before each test
    (useSelector as jest.Mock).mockClear();
  });
  
  it('renders nothing when no breadcrumbs are available', () => {
    // Mock the useSelector to return an empty array
    (useSelector as jest.Mock).mockReturnValue([]);
    
    const { container } = render(<Breadcrumbs location={mockLocation} />);
    expect(container.firstChild).toBeNull();
  });
  
  it('renders breadcrumbs correctly', () => {
    // Mock the useSelector to return breadcrumbs
    const mockBreadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Courses', path: '/courses' },
      { name: 'Course 123', path: '/courses/123' }
    ];
    (useSelector as jest.Mock).mockReturnValue(mockBreadcrumbs);
    
    render(<Breadcrumbs location={mockLocation} />);
    
    // Check if all breadcrumbs are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Course 123')).toBeInTheDocument();
    
    // Check if the last breadcrumb has the 'current' class
    const currentBreadcrumb = screen.getByText('Course 123');
    expect(currentBreadcrumb).toHaveClass('current');
    
    // Check if the first two breadcrumbs are links
    const homeLink = screen.getByText('Home').closest('a');
    const coursesLink = screen.getByText('Courses').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(coursesLink).toHaveAttribute('href', '/courses');
    
    // Check if separators are rendered
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });
  
  it('renders a single breadcrumb correctly', () => {
    // Mock the useSelector to return a single breadcrumb
    const mockBreadcrumbs = [
      { name: 'Home', path: '/' }
    ];
    (useSelector as jest.Mock).mockReturnValue(mockBreadcrumbs);
    
    render(<Breadcrumbs location={mockLocation} />);
    
    // Check if the breadcrumb is rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    
    // Check if the breadcrumb has the 'current' class
    const currentBreadcrumb = screen.getByText('Home');
    expect(currentBreadcrumb).toHaveClass('current');
    
    // Check that there are no separators
    const separators = screen.queryAllByText('/');
    expect(separators).toHaveLength(0);
  });
});
