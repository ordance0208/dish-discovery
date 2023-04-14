import { makeStyles } from '@mui/styles';
import { WHITE } from '../../theme';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/dish-discovery-logo-web.png';
import IconButton from '../IconButton'
import { UilSun, UilMoon } from '@iconscout/react-unicons';
import { useContext } from 'react';
import { ThemeColorContext } from '../../theme';

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    padding: '16px 0',
    borderBottom: '1px solid #f7f7f7',
    background: theme.palette.background.default,
  },
  header: {
    maxWidth: 1440,
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
    display: 'flex',
    gap: 18,
    alignItems: 'center',
    '& a': {
      display: 'inline-block',
      textDecoration: 'none',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      color: theme.palette.text.primary,
    },
    '&  a:nth-child(5)': {
      background: theme.palette.primary.main,
      padding: '8px 16px',
      borderRadius: 18,
      color: WHITE,
    },
  },
  iconMoon: {
    color: theme.palette.text.primary
  }
}));

const Navbar = () => {
  const classes = useStyles();

  const {colorMode, toggleColorMode} = useContext(ThemeColorContext);

  return (
    <>
      <header className={classes.root}>
        <div className={classes.header}>
          <img className={classes.logo} src={logo} />
          <nav className={classes.nav}>
            <Link to='/home'>Home</Link>
            <Link to='/recipes'>Recipes</Link>
            <Link to='/about'>About</Link>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
            <IconButton onClick={toggleColorMode}>
              {colorMode === 'light' ? <UilMoon className={classes.iconMoon}/> : <UilSun color={WHITE}/>}
            </IconButton>
          </nav>
        </div>
      </header>
      <div style={{ width: '100%', height: '70px' }}></div>
    </>
  );
};

export default Navbar;
