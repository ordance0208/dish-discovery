import { forwardRef } from 'react';
import { SnackbarContent } from 'notistack';
import { WHITE } from '../../theme';
import { makeStyles } from '@mui/styles';
import { UilTimes } from '@iconscout/react-unicons';
import Alert from '../Alert';
import Typography from '../Typography';
import IconButton from '../IconButton';

interface Props {
  severity: 'error' | 'info' | 'success' | 'warning' | undefined;
  message: string;
  onClose: () => void;
}

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
  (
    { severity, message, onClose }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const classes = useStyles();

    return (
      <SnackbarContent ref={ref}>
        <Alert severity={severity} className={classes.snackbarAlert}>
          <div className={classes.snackbarContent}>
            <Typography>{message}</Typography>
            <IconButton onClick={onClose}>
              <UilTimes color={WHITE} />
            </IconButton>
          </div>
        </Alert>
      </SnackbarContent>
    );
  }
);

export default Snackbar;
