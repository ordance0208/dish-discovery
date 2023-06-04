import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { WHITE } from '../../theme';
import { Link } from 'react-router-dom';
import { menuPaths } from '../../utils/navbar.helpers';
import { Path } from '../../models/path';
import HamburgerButton from '../HamburgerButton';
import MobileMenu from '../MobileMenu';
import logo from '../../assets/img/dish-discovery-logo-web.png';
import { useAuthContext } from '../../utils/AuthContext/context';
import { useAuthData } from '../../utils/AuthContext/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
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
  iconMoon: {
    color: theme.palette.text.primary,
  },
  iconMoonSpecial: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [menuOpened, setmenuOpened] = useState<boolean>(false);

  const { loading } = useAuthData()

  return (
    <>
      <header className={classes.root}>
        <div className={classes.header}>
          <img className={classes.logo} src={logo} alt="navbar logo"/>
          <nav className={classes.nav}>
            {menuPaths.map(({ to, label, availableWhenLoggedIn }: Path) => {
              if(!availableWhenLoggedIn && localStorage.getItem('token')) return
              return (
                <Link to={to} key={to}>
                  {label}
                </Link>
              )
            })}
            {/* <ThemeToggleButton /> */}
          </nav>
          <div className={classes.iconMoonSpecial}>
            {/* <ThemeToggleButton /> */}
            <HamburgerButton
              menuOpened={menuOpened}
              setMenuOpened={setmenuOpened}
            />
          </div>
        </div>
      </header>
      <div style={{ width: '100%', height: '70px', position: 'relative' }}>
        <MobileMenu menuOpened={menuOpened} setMenuOpened={setmenuOpened} paths={menuPaths} />
      </div>
    </>
  );
};

export default Navbar;
