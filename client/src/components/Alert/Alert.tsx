import clsx from 'clsx';
import { Alert as MuiAlert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  UilCheckCircle,
  UilExclamationCircle,
  UilInfoCircle,
  UilTimesCircle,
} from '@iconscout/react-unicons';

interface Props {
  children: JSX.Element | string;
  variant?: 'filled' | 'outlined' | 'standard';
  severity?: 'error' | 'info' | 'success' | 'warning';
  className?: string;
}

const useStyles = makeStyles({
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 600,
    height: 40,
  },
});

const Alert = ({
  variant = 'filled',
  severity = 'success',
  children,
  className,
}: Props) => {
  const classes = useStyles();

  const alertIcon =
    severity === 'success' ? (
      <UilCheckCircle />
    ) : severity === 'error' ? (
      <UilTimesCircle />
    ) : severity === 'info' ? (
      <UilInfoCircle />
    ) : (
      <UilExclamationCircle />
    );

  return (
    <MuiAlert
      className={clsx(classes.alert, className)}
      variant={variant}
      severity={severity}
      icon={alertIcon}
    >
      {children}
    </MuiAlert>
  );
};

export default Alert;
