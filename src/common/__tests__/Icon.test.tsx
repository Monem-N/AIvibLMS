import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon Component', () => {
  const mockGlyph = { id: 'test-icon' };
  
  it('renders without crashing', () => {
    render(<Icon glyph={mockGlyph} />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
  
  it('applies the correct class names', () => {
    render(<Icon glyph={mockGlyph} className="custom-class" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveClass('icon');
    expect(svgElement).toHaveClass('custom-class');
  });
  
  it('uses the correct glyph ID', () => {
    render(<Icon glyph={mockGlyph} />);
    const useElement = document.querySelector('use');
    expect(useElement).toHaveAttribute('xlink:href', '#test-icon');
  });
  
  it('passes additional props to the svg element', () => {
    render(<Icon glyph={mockGlyph} width="24" height="24" fill="red" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('fill', 'red');
  });
});
