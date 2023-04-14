import { makeStyles } from '@mui/styles';
import { WHITE, TEXT_DARK } from '../../theme';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/dish-discovery-logo-web.png';

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    padding: '16px 0',
    borderBottom: '1px solid #f7f7f7',
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
      color: TEXT_DARK,
    },
    '&  a:last-child': {
      background: theme.palette.primary.main,
      padding: '8px 16px',
      borderRadius: 18,
      color: WHITE,
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

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
          </nav>
        </div>
      </header>
      <div style={{ width: '100%', height: '70px' }}></div>
    </>
  );
};

export default Navbar;
