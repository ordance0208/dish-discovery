import { makeStyles } from '@mui/styles';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MuiDialog from '@mui/material/Dialog';
import Button from '../Button';

interface Props {
  open: boolean;
  title: string;
  children: JSX.Element;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const useStyles = makeStyles({
  dialog: {
    margin: 0,
    padding: 20,
  },
  title: {
    padding: 0,
    marginBottom: 12,
  },
  content: {
    padding: 0,
    marginBottom: 12,
  },
  actions: {
    gap: 16,
    '& > button:not(:first-of-type)': {
      margin: 0,
    },
  },
});

const Dialog = ({
  open,
  title,
  children,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  onClose,
  onConfirm,
}: Props) => {
  const classes = useStyles();

  return (
    <MuiDialog classes={{ paper: classes.dialog }} open={open}>
      <DialogTitle classes={{ root: classes.title }}>{title}</DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        {children}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button onClick={onConfirm}>{confirmButtonText}</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
