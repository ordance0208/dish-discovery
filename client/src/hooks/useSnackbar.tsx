import {
  SnackbarKey,
  SnackbarMessage,
  useSnackbar as useSnackbarNative,
} from 'notistack';
import Snackbar from '../components/Snackbar';

interface Props {
  text: string;
  severity: 'error' | 'info' | 'success' | 'warning';
}

const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbarNative();

  return (args: Props) => {
    const { text, severity } = args;
    enqueueSnackbar({
      message: text,
      anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
      autoHideDuration: 2500,
      variant: severity,
      content: (key: SnackbarKey, message: SnackbarMessage) => {
        return (
          <Snackbar
            key={key}
            message={message as string}
            severity={severity}
            onClose={() => closeSnackbar(key)}
          />
        );
      },
    });
  };
};

export default useSnackbar;
