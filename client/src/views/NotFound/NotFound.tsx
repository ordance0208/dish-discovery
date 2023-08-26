import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PATHS } from '../../routes';
import { UilLinkBroken } from '@iconscout/react-unicons';
import Typography from '../../components/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100vh - 71px)',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      padding: 16
    }
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(PATHS.NOT_FOUND, { replace: true });
  }, []);

  return (
    <div className={classes.root}>
      <UilLinkBroken size={128} color={theme.palette.primary.main} />
      <Typography className={classes.text}>
        Opss. The page you were trying to access does not exist.
      </Typography>
    </div>
  );
};

export default NotFound;
