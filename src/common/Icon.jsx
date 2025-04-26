import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon component - Renders SVG icons
 */
const Icon = ({ glyph, className = '', ...props }) => {
  return (
    <svg className={`icon ${className}`} {...props}>
      <use xlinkHref={`#${glyph.id}`} />
    </svg>
  );
};

Icon.propTypes = {
  glyph: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Icon;
