import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import Search from '../search/Search';
import Icon from '../../common/Icon';
import { ADMIN_LEVEL } from '../../constants/constants';
import { NavigationProps, NavItem } from '../../types/navigation';
import { RootState } from '../../types/state';

// Import SVG icons
import Trophy from '../../../assets/svg/trophy.svg';
import Calendar from '../../../assets/svg/calendar.svg';
import Info from '../../../assets/svg/info.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import Close from '../../../assets/svg/x.svg';
import Forward from '../../../assets/svg/forward.svg';
import Chat from '../../../assets/svg/chat.svg';
import Course from '../../../assets/svg/course.svg';
import Subject from '../../../assets/svg/subject.svg';
import Module from '../../../assets/svg/module.svg';
import Activity from '../../../assets/svg/activity.svg';
import Post from '../../../assets/svg/post.svg';
import Admin from '../../../assets/svg/cog.svg';
import Dashboard from '../../../assets/svg/dashboard.svg';
import Team from '../../../assets/svg/team.svg';
import Account from '../../../assets/svg/account.svg';

// Import CSS
import './Navigation.css';

/**
 * Navigation component - Side navigation menu
 * Modernized version without jQuery dependencies
 */
const Navigation: React.FC<NavigationProps> = ({
  nav_items,
  sidenavRef,
  searchPanelRef,
  toggleNav,
  toggleSearch,
  closeSearch,
  isSearching
}) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.mainReducer.user);
  const userData = useSelector((state: RootState) => state.mainReducer.userData);
  
  // State to track opened navigation items
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  
  /**
   * Toggle a navigation item's expanded state
   * @param {number} itemId - ID of the navigation item
   */
  const toggleItem = (itemId: number): void => {
    setOpenItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };
  
  /**
   * Render a navigation item
   * @param {Object} item - Navigation item data
   * @param {number} index - Item index
   * @returns {React.ReactNode} - Rendered navigation item
   */
  const renderItem = (item: NavItem, index: number): React.ReactNode => {
    const hasChildren = item.children ? 'has-children' : '';
    const isOpen = openItems[item.id] ? 'opened' : '';
    
    // Check if user has permission to see this item
    if (item.level && (!userData || !userData.info || item.level > userData.info.level)) {
      return null;
    }
    
    return (
      <li key={index} className={`nav-item ${hasChildren} ${isOpen}`}>
        {item.icon && <Icon glyph={item.icon} className="icon item-icon" />}
        
        {item.children ? (
          <button className="title" onClick={() => toggleItem(item.id)}>
            {item.title}
            <Icon glyph={Forward} className="icon arrow" />
          </button>
        ) : (
          <Link to={item.link || '#'} className="title" onClick={toggleNav}>
            {item.title}
          </Link>
        )}
        
        {item.children && (
          <ul className="nav-children">
            {item.children.map((child) => (
              <li key={child.id} className="nav-child">
                <Link to={child.link || '#'} onClick={toggleNav}>
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };
  
  return (
    <nav className="navigation">
      <Breadcrumbs location={location} />
      
      <div className="sidenav flyout" ref={sidenavRef}>
        <button className="mobile-close" onClick={toggleNav}>
          <Icon glyph={Close} className="icon close" />
        </button>
        
        <table className="mobile-nav-items">
          <tbody>
            <tr>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <Icon glyph={Calendar} className="icon calendar" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <Icon glyph={Trophy} className="icon trophy" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <Icon glyph={Info} className="icon info" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleSearch}>
                  <Icon glyph={SearchIcon} className="icon search" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item">
                  <Icon glyph={Chat} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="nav-scroll">
          <ul className="nav-items">
            {nav_items && nav_items.map((item, i) => renderItem(item, i))}
          </ul>
        </div>
      </div>
      
      <Search 
        searchPanelRef={searchPanelRef}
        closeSearch={closeSearch} 
        isSearching={isSearching}
      />
    </nav>
  );
};

Navigation.defaultProps = {
  nav_items: [
    {
      id: 0,
      title: 'Dashboard',
      icon: Dashboard,
      link: '/dashboard'
    },
    {
      id: 12,
      title: 'Account',
      icon: Account,
      children: [
        {
          id: 13,
          title: 'My account',
          link: '/account'
        }
      ]
    },
    {
      id: 1,
      title: 'Courses',
      icon: Course,
      link: '/courses'
    },
    {
      id: 2,
      title: 'Subjects',
      icon: Subject,
      link: '/subjects'
    },
    {
      id: 3,
      title: 'Modules',
      icon: Module,
      link: '/modules'
    },
    {
      id: 4,
      title: 'Activities',
      icon: Activity,
      link: '/activities'
    },
    {
      id: 5,
      title: 'Blog',
      icon: Post,
      link: '/blog'
    },
    {
      id: 6,
      title: 'About',
      icon: Team,
      children: [
        {
          id: 7,
          title: 'Summary',
          link: '/about'
        },
        {
          id: 8,
          title: 'Jobs',
          link: '/about/jobs'
        },
        {
          id: 10,
          title: 'Contact',
          link: '/about/contact'
        }
      ]
    },
    {
      id: 11,
      title: 'Admin',
      icon: Admin,
      link: '/admin',
      level: ADMIN_LEVEL
    }
  ]
};

export default Navigation;
