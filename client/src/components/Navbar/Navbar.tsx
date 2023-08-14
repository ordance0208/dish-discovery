import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { WHITE } from '../../theme';
import { useAuthData } from '../../utils/AuthContext/selectors';
import { menuPaths } from '../../utils/navbar.helpers';
import { Path } from '../../models/path';
import HamburgerButton from '../HamburgerButton';
import MobileMenu from '../MobileMenu';
import ProfileDropdown from '../ProfileDropdown';
import logo from '../../assets/img/dish-discovery-logo-web.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '16px 0',
    borderBottom: '1px solid #f3f3f3',
    background: theme.palette.background.default,
    zIndex: 10,
  },
  header: {
    maxWidth: 1440,
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 150,
    height: 'auto',
  },
  nav: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    display: 'flex',
    gap: 18,
    alignItems: 'center',
    '& a': {
      display: 'inline-block',
      textDecoration: 'none',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 600,
      color: theme.palette.text.primary,
    },
    '& a:nth-child(5)': {
      background: theme.palette.primary.main,
      padding: '8px 16px',
      borderRadius: 4,
      color: WHITE,
      transition: '400ms all',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  },
  hamburgerButtonWrapper: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    },
  },
  mobileMenuWrapper: {
    position: 'relative',
    width: '100%',
    height: 70,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [menuOpened, setmenuOpened] = useState<boolean>(false);

  const { user } = useAuthData();

  return (
    <>
      <header className={classes.root}>
        <div className={classes.header}>
          <img className={classes.logo} src={logo} alt='navbar logo' />
          <nav className={classes.nav}>
            {menuPaths.map(
              ({ to, label, availableWhenLoggedIn, protectedRoute }: Path) => {
                if (
                  (!availableWhenLoggedIn && localStorage.getItem('token')) ||
                  (protectedRoute && !localStorage.getItem('token'))
                )
                  return null;
                return (
                  <Link to={to} key={to}>
                    {label}
                  </Link>
                );
              }
            )}
            {user && <ProfileDropdown />}
          </nav>
          <div className={classes.hamburgerButtonWrapper}>
            <HamburgerButton
              menuOpened={menuOpened}
              setMenuOpened={setmenuOpened}
            />
            {user && <ProfileDropdown />}
          </div>
        </div>
      </header>
      <div className={classes.mobileMenuWrapper}>
        <MobileMenu
          menuOpened={menuOpened}
          paths={menuPaths}
          setMenuOpened={setmenuOpened}
        />
      </div>
    </>
  );
};

export default Navbar;
