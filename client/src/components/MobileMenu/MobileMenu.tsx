import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Collapse, Theme } from '@mui/material';

type Path = {
  label: string;
  to: string;
};

interface Props {
  menuOpened: boolean;
  paths: Path[];
}

const useStyles = makeStyles((theme: Theme) => ({
  mobileMenuLinks: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    textAlign: 'center',
    height: 45,
    background: theme.palette.background.default,
    '&:hover': {
      background: '#f3f3f3',
    },
    '& a': {
      textDecoration: 'none',
      fontFamily: 'Helvetica',
      fontWeight: 600,
      color: theme.palette.text.primary,
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  mobileMenuContianer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
  },
}));

const MobileMenu = ({ menuOpened, paths }: Props) => {
  const classes = useStyles();

  return (
    <Collapse in={menuOpened} className={classes.mobileMenuContianer}>
      {paths.map(({ to, label }: Path) => (
        <div className={classes.mobileMenuLinks} key={to}>
          <Link to={to}>
            {label.charAt(0).toUpperCase() + label.substring(1)}
          </Link>
        </div>
      ))}
    </Collapse>
  );
};

export default MobileMenu;
