import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ClickAwayListener, Collapse, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Path = {
  label: string;
  to: string;
  availableWhenLoggedIn?: boolean;
};

interface Props {
  menuOpened: boolean;
  paths: Path[];
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
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
    position: 'fixed',
    top: 71,
    left: 0,
    zIndex: 1500,
    width: '100%',
  },
}));

const MobileMenu = ({ menuOpened, paths, setMenuOpened }: Props) => {
  const classes = useStyles();

  return (
    <ClickAwayListener
      onClickAway={(e: any) => {
        const isHamburgerButton = e?.srcElement?.id === 'hamburger-button';
        if (isHamburgerButton) return;
        setMenuOpened(false);
      }}
      mouseEvent='onMouseDown'
    >
      <Collapse in={menuOpened} className={classes.mobileMenuContianer}>
        {paths.map(({ to, label, availableWhenLoggedIn }: Path) =>
          (!availableWhenLoggedIn && localStorage.getItem('token')) ||
          (availableWhenLoggedIn && !localStorage.getItem('token')) ? null : (
            <div
              className={classes.mobileMenuLinks}
              onClick={() => setMenuOpened(false)}
              key={to}
            >
              <Link to={to}>
                {label.charAt(0).toUpperCase() + label.substring(1)}
              </Link>
            </div>
          )
        )}
      </Collapse>
    </ClickAwayListener>
  );
};

export default MobileMenu;
