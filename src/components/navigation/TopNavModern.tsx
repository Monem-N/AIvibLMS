import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { Typography } from '@mui/material';
import { setUser, setPanel } from '../../actions/actions';
import Navigation from './Navigation';
import SignUpModern from '../auth/SignUpModern';
import SignInModern from '../auth/SignInModern';
import Icon from '../../common/Icon';
import { TopNavProps } from '../../types/navigation';
import { RootState } from '../../types/state';

// Import Material-UI icons
import SchoolIcon from '@mui/icons-material/School'; // Logo replacement
import AvatarIcon from '@mui/icons-material/AccountCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Trophy
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';

// Import CSS
import './TopNav.css';

/**
 * TopNav component - Main navigation bar for the application
 * Modernized version without jQuery dependencies
 */
const TopNavModern: React.FC<TopNavProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { user, panel } = useSelector((state: RootState) => state.mainReducer);

  // State
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  // Refs
  const sidenavRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);
  const navIconRef = useRef<HTMLButtonElement>(null);

  // Effect to handle body scroll when overlay is shown
  useEffect(() => {
    if (isNavigating || isSearching) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNavigating, isSearching]);

  /**
   * Toggle navigation menu
   */
  const toggleNav = (): void => {
    if (isNavigating) {
      closeNav();
    } else {
      openNav();
    }
  };

  /**
   * Open navigation menu
   */
  const openNav = (): void => {
    // Close any open flyouts
    if (searchPanelRef.current) {
      searchPanelRef.current.classList.remove('opened');
      searchPanelRef.current.classList.add('closed');
    }

    // Show overlay with fade-in animation
    if (overlayRef.current) {
      overlayRef.current.style.display = 'block';
      overlayRef.current.classList.add('fade-in');
    }

    // Open sidenav
    if (sidenavRef.current) {
      sidenavRef.current.classList.add('opened');
      sidenavRef.current.classList.remove('closed');
    }

    // Update nav icon
    if (navIconRef.current) {
      navIconRef.current.classList.add('opened');
    }

    // Update state
    setIsSearching(false);
    setIsNavigating(true);
  };

  /**
   * Close navigation menu
   */
  const closeNav = (): void => {
    // Close sidenav
    if (sidenavRef.current) {
      sidenavRef.current.classList.remove('opened');
      sidenavRef.current.classList.add('closed');
    }

    // Hide overlay
    if (overlayRef.current) {
      overlayRef.current.style.display = 'none';
      overlayRef.current.classList.remove('fade-in');
    }

    // Update nav icon
    if (navIconRef.current) {
      navIconRef.current.classList.remove('opened');
    }

    // Update state
    setIsNavigating(false);
  };

  /**
   * Toggle search panel
   */
  const toggleSearch = (): void => {
    if (isSearching) {
      closeSearch();
    } else {
      openSearch();
    }
  };

  /**
   * Open search panel
   */
  const openSearch = (): void => {
    // Close any open flyouts
    if (sidenavRef.current) {
      sidenavRef.current.classList.remove('opened');
      sidenavRef.current.classList.add('closed');
    }

    // Open search panel
    if (searchPanelRef.current) {
      searchPanelRef.current.classList.add('opened');
      searchPanelRef.current.classList.remove('closed');
    }

    // Update nav icon
    if (navIconRef.current) {
      navIconRef.current.classList.remove('opened');
    }

    // Show overlay with fade-in animation
    if (overlayRef.current) {
      overlayRef.current.style.display = 'block';
      overlayRef.current.classList.add('fade-in');
    }

    // Focus search input
    const searchInput = searchPanelRef.current?.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }

    // Update state
    setIsSearching(true);
    setIsNavigating(false);
  };

  /**
   * Close search panel
   */
  const closeSearch = (): void => {
    // Close search panel
    if (searchPanelRef.current) {
      searchPanelRef.current.classList.remove('opened');
      searchPanelRef.current.classList.add('closed');
    }

    // Hide overlay
    if (overlayRef.current) {
      overlayRef.current.style.display = 'none';
      overlayRef.current.classList.remove('fade-in');
    }

    // Update state
    setIsSearching(false);
  };

  /**
   * Change active panel
   * @param {string} panelName - Name of the panel to activate
   */
  const changePanel = (panelName: string): void => {
    closeNav();
    closeSearch();

    if (panel === panelName) {
      dispatch(setPanel(''));
    } else {
      dispatch(setPanel(panelName));
    }
  };

  return (
    <section className={`top-nav ${className}`}>
      <div className="top-nav-bar">
        <button
          className="top-nav-item nav-icon"
          ref={navIconRef}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
          <span />
        </button>

        <button className="top-nav-item" onClick={toggleSearch}>
          {isSearching ? (
            <CloseIcon className="icon close-search" />
          ) : (
            <SearchIcon className="icon search" />
          )}
        </button>

        {user && (
          <button className="top-nav-item" onClick={() => changePanel('calendar')}>
            {panel === 'calendar' ? (
              <CloseIcon />
            ) : (
              <CalendarTodayIcon className="icon calendar" />
            )}
          </button>
        )}

        {user && (
          <button className="top-nav-item" onClick={() => changePanel('grades')}>
            {panel === 'grades' ? (
              <CloseIcon />
            ) : (
              <EmojiEventsIcon className="icon trophy" />
            )}
          </button>
        )}

        {user && (
          <button className="top-nav-item" onClick={() => changePanel('help')}>
            {panel === 'help' ? (
              <CloseIcon />
            ) : (
              <HelpIcon className="icon info" />
            )}
          </button>
        )}

        <Link to="/" className="logo">
          <SchoolIcon />
          <Typography variant="h6" className="icon logo-wording">AIvibLMS</Typography>
        </Link>

        {!user || (user && !user.emailVerified) ? (
          <div className="user-controls">
            <div className="lang">EN</div>
            <div className="user-controls-cta sign-up-cta">
              <button>Sign up</button>
              <SignUpModern />
            </div>
            <div className="user-controls-cta sign-in-cta">
              <button>Sign in</button>
              <SignInModern />
            </div>
          </div>
        ) : (
          <div className="user-controls">
            <div className="lang">EN</div>
            <button className="chat-icon" onClick={() => changePanel('chat')}>
              {panel === 'chat' ? (
                <CloseIcon className="icon close-chat" />
              ) : (
                <ChatIcon className="icon chat" />
              )}
            </button>

            <div className="user-controls-cta account-cta">
              {user && (
                <Link to="/dashboard">
                  {user.email ? (
                    <img
                      alt=""
                      className="photo"
                      src={`https://www.gravatar.com/avatar/${md5(user.email)}.jpg?s=20`}
                    />
                  ) : (
                    <AvatarIcon />
                  )}
                  <span>{user.info?.displayName || ''}</span>
                </Link>
              )}
              <button
                onClick={() => {
                  dispatch(setUser(null));
                }}
              >
                <LogoutIcon className="icon sign-out" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Navigation
        sidenavRef={sidenavRef}
        searchPanelRef={searchPanelRef}
        toggleNav={toggleNav}
        toggleSearch={toggleSearch}
        closeSearch={closeSearch}
        isSearching={isSearching}
      />

      <button
        className="overlay"
        ref={overlayRef}
        onClick={() => {
          closeNav();
          closeSearch();
        }}
      />
    </section>
  );
};

export default TopNavModern;
