import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  hamburgerButton: {
    display: 'none',
    padding: '8px 0',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  hamburgerLayers: {
    width: 24,
    height: 3,
    borderRadius: 8,
    background: theme.palette.text.primary,
    transition: '300ms all ease',
    position: 'relative',
    '&:hover': {
      cursor: 'pointer',
    },
    '&[data-active="true"]': {
      transform: 'rotate(135deg)',
    },
    '&[data-active="true"]::before': {
      top: 0,
      transform: 'rotate(90deg)',
    },
    '&[data-active="true"]::after': {
      top: 0,
      transform: 'rotate(-90deg)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
      left: 0,
      width: 'inherit',
      height: 'inherit',
      borderRadius: 'inherit',
      background: 'inherit',
      transition: '300ms all ease',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 8,
      left: 0,
      width: 'inherit',
      height: 'inherit',
      borderRadius: 'inherit',
      background: 'inherit',
      transition: '300ms all ease',
    },
  },
}));

const HamburgerButton = ({ menuOpened, setMenuOpened }: Props) => {
  const classes = useStyles();

  return (
    <div
      className={classes.hamburgerButton}
      onClick={() => setMenuOpened((prev: boolean) => !prev)}
    >
      <div className={classes.hamburgerLayers} data-active={menuOpened}></div>
    </div>
  );
};

export default HamburgerButton;
