/**
 * Navigation types for the Hypatia LMS
 */

/**
 * Navigation item
 */
export interface NavItem {
  id: number;
  title: string;
  icon?: any; // SVG icon
  link?: string;
  children?: NavItem[];
  level?: number;
}

/**
 * Breadcrumb item
 */
export interface Breadcrumb {
  name: string;
  path: string;
}

/**
 * TopNav props
 */
export interface TopNavProps {
  className?: string;
}

/**
 * Navigation props
 */
export interface NavigationProps {
  nav_items?: NavItem[];
  sidenavRef: React.RefObject<HTMLDivElement>;
  searchPanelRef: React.RefObject<HTMLDivElement>;
  toggleNav: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  isSearching: boolean;
}

/**
 * Search props
 */
export interface SearchProps {
  searchPanelRef: React.RefObject<HTMLDivElement>;
  closeSearch: () => void;
  isSearching: boolean;
}

/**
 * Breadcrumbs props
 */
export interface BreadcrumbsProps {
  location: {
    pathname: string;
  };
}
