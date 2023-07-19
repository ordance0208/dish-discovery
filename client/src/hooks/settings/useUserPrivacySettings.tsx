import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { IResponse } from '../../models/response';
import { PasswordPayload } from '../../models/user/userSettingsPayloads';
import { deleteUserAccount, updateUserPassword } from '../../endpoints/user';
import { PATHS } from '../../routes';

const useUserPrivacySettings = (
  setResponse: React.Dispatch<React.SetStateAction<IResponse | undefined>>
) => {
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

  const handleErrorResponse = (text: string) => {
    setResponse({ severity: 'warning', text });
  };

  const handleSuccessResponse = (text: string) => {
    setResponse({ severity: 'success', text });
  };

  const handlePasswordChange = async (
    values: PasswordPayload,
    resetForm: () => void
  ) => {
    try {
      await updateUserPassword(values);
      resetForm();
      handleSuccessResponse('Password changed successfully!');
    } catch (err: any) {
      handleErrorResponse(err.response.data.error);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      await logoutAllSessions();
      navigate(PATHS.HOME);
    } catch (err: any) {
      handleErrorResponse('Error logging out of all sessions!');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      deleteAccount();
      navigate(PATHS.HOME);
    } catch (err: any) {
      handleErrorResponse('Error deleting account!');
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
