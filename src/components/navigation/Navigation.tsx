import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import Search from '../search/Search';
import Icon from '../../common/Icon';
import { ADMIN_LEVEL } from '../../constants/constants';
import { NavigationProps, NavItem } from '../../types/navigation';
import { RootState } from '../../types/state';

// Import Material-UI icons
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Trophy
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Forward
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School'; // Course
import CategoryIcon from '@mui/icons-material/Category'; // Subject
import ViewModuleIcon from '@mui/icons-material/ViewModule'; // Module
import AssignmentIcon from '@mui/icons-material/Assignment'; // Activity
import ArticleIcon from '@mui/icons-material/Article'; // Post
import SettingsIcon from '@mui/icons-material/Settings'; // Admin
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups'; // Team
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Account

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
  // Access user data from mainReducer instead of user reducer to match the state structure
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
        {item.icon}

        {item.children ? (
          <button className="title" onClick={() => toggleItem(item.id)}>
            {item.title}
            <ArrowForwardIosIcon className="icon arrow" fontSize="small" />
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
          <CloseIcon className="icon close" />
        </button>

        <table className="mobile-nav-items">
          <tbody>
            <tr>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <CalendarTodayIcon className="icon calendar" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <EmojiEventsIcon className="icon trophy" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleNav}>
                  <InfoIcon className="icon info" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item" onClick={toggleSearch}>
                  <SearchIcon className="icon search" />
                </button>
              </td>
              <td>
                <button className="mobile-nav-item">
                  <ChatIcon />
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
      icon: <DashboardIcon className="icon item-icon" />,
      link: '/dashboard'
    },
    {
      id: 12,
      title: 'Account',
      icon: <AccountCircleIcon className="icon item-icon" />,
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
      icon: <SchoolIcon className="icon item-icon" />,
      link: '/courses'
    },
    {
      id: 2,
      title: 'Subjects',
      icon: <CategoryIcon className="icon item-icon" />,
      link: '/subjects'
    },
    {
      id: 3,
      title: 'Modules',
      icon: <ViewModuleIcon className="icon item-icon" />,
      link: '/modules'
    },
    {
      id: 4,
      title: 'Activities',
      icon: <AssignmentIcon className="icon item-icon" />,
      link: '/activities'
    },
    {
      id: 5,
      title: 'Blog',
      icon: <ArticleIcon className="icon item-icon" />,
      link: '/blog'
    },
    {
      id: 6,
      title: 'About',
      icon: <GroupsIcon className="icon item-icon" />,
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
      icon: <SettingsIcon className="icon item-icon" />,
      link: '/admin',
      level: ADMIN_LEVEL
    }
  ]
};

export default Navigation;
