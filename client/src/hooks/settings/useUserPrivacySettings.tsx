import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useSnackbar from '../useSnackbar';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { PasswordPayload } from '../../models/user/userSettingsPayloads';
import { deleteUserAccount, updateUserPassword } from '../../endpoints/user';
import { PATHS } from '../../routes';

const useUserPrivacySettings = () => {
  const queueSnackbar = useSnackbar();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(
      'Please enter your current password'
    ),
    newPassword: Yup.string()
      .matches(
        // eslint-disable-next-line
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and a special character'
      )
      .required('Please enter a new password'),
    confirmNewPassword: Yup.string()
      .required('Please confirm your new password')
      .oneOf([Yup.ref('newPassword')], "Passwords don't match"),
  });

  const navigate = useNavigate();
  const { logoutAllSessions, deleteAccount } = useAuthActions();

  const handlePasswordChange = async (
    values: PasswordPayload,
    resetForm: () => void
  ) => {
    try {
      await updateUserPassword(values);
      resetForm();
      queueSnackbar({
        text: 'Password changed successfully!',
        severity: 'success',
      });
    } catch (err: any) {
      queueSnackbar({
        text: err.response.data.error,
        severity: 'success',
      });
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      await logoutAllSessions();
      navigate(PATHS.RECIPES);
    } catch (err: any) {
      queueSnackbar({
        text: 'Error logging out of all sessions!',
        severity: 'success',
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      deleteAccount();
      navigate(PATHS.RECIPES);
    } catch (err: any) {
      queueSnackbar({
        text: 'Error deleting account!',
        severity: 'success',
      });
    }
  };

  return {
    initialValues,
    validationSchema,
    handlePasswordChange,
    handleLogoutAllSessions,
    handleDeleteAccount,
  };
};

export default useUserPrivacySettings;
