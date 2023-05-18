import { memo, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';
import { ReactComponent as Logo } from '@/media/main-logo.svg';
import { useAppSelector } from '@/store';
import { selectIsUserLoggedIn } from '@/store/userSlice';
import { classNameHelper } from '@/utils';

import classes from './Navigation.module.scss';

const NAVIGATION_ITEMS = [
  { link: 'auth', name: 'Login' },
  { link: 'emails', name: 'Emails' }
];

const LOGIN_NAVIGATION_ITEMS = [
  { link: 'work', name: 'Work' },
  { link: 'profile', name: 'Profile' },
  { link: 'emails', name: 'Emails' }
];

function Links() {
  const isLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const renderNavLinkClass = ({ isActive = false }) => {
    return isActive
      ? classNameHelper(classes['nav-link'], classes['active'])
      : classes['nav-link'];
  };

  const renderLinks = () => {
    let items = NAVIGATION_ITEMS;
    if (isLoggedIn) {
      items = LOGIN_NAVIGATION_ITEMS;
    }

    return items.map((item) => {
      return (
        <NavLink key={item.name} className={renderNavLinkClass} to={item.link}>
          <span data-hover={item.name}>{item.name}</span>
        </NavLink>
      );
    });
  };

  return (
    <>
      <NavLink className={renderNavLinkClass} to="/" end>
        <FaHome />
        <span data-hover="Home">Home</span>
      </NavLink>
      {renderLinks()}
    </>
  );
}

function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobileView = useMediaQuery();
  const closeClass = isOpen ? '' : classes.closed;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={classes.navbar} data-cy="navbar">
      <div className={classes['logo']}>
        <Logo />
      </div>
      {!isMobileView ? (
        <div className={classes['navigation']}>
          <Links />
        </div>
      ) : (
        <div className={classNameHelper(classes.mobile, closeClass)}>
          <header className={classes.header}>
            Menu
            <span className={classes.close}>
              <AiOutlineCloseCircle />
            </span>
          </header>
          <Links />
          <footer>
            <button
              className={classes.btn}
              aria-label="Toggle Menu"
              onClick={toggleMenu}
            />
          </footer>
        </div>
      )}
    </nav>
  );
}

export const Navigation = memo(Component);
