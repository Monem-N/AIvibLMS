import React from 'react';

/**
 * Icon props
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  glyph: {
    id: string;
  };
  className?: string;
}

/**
 * Icon component - Renders SVG icons
 */
const Icon: React.FC<IconProps> = ({ glyph, className = '', ...props }) => {
  return (
    <svg className={`icon ${className}`} {...props}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
};

export default Icon;
