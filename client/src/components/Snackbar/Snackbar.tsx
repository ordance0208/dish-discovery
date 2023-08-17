import { forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import { WHITE } from '../../theme';
import { makeStyles } from '@mui/styles';
import { UilTimes } from '@iconscout/react-unicons';
import Alert from '../Alert';
import Typography from '../Typography';
import IconButton from '../IconButton';

const useStyles = makeStyles({
  snackbarAlert: {
    padding: '28px 16px',
    textAlign: 'left',
  },
  snackbarContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});

const Snackbar = forwardRef(
  (props: any, ref: React.ForwardedRef<HTMLDivElement>) => {
    const classes = useStyles();

    return (
      <SnackbarContent ref={ref}>
        <Alert severity={props.severity} className={classes.snackbarAlert}>
          <div className={classes.snackbarContent}>
            <Typography>{props.message}</Typography>
            <IconButton onClick={props.onClose}>
              <UilTimes color={WHITE} />
            </IconButton>
          </div>
        </Alert>
      </SnackbarContent>
    );
  }
);

export default Snackbar;
