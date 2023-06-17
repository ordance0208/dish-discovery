import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { AUTH_PATHS } from '../../routes';

const useUserPrivacySettings = () => {
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
      .oneOf([Yup.ref('password')], "Passwords don't match"),
  });

  const navigate = useNavigate();
  const { logoutAllSessions } = useAuthActions();

  const handleLogoutAllSessions = async () => {
    await logoutAllSessions();
    navigate(AUTH_PATHS.LOGIN);
  };

  const handleDeleteAccount = async () => {};

  return {
    initialValues,
    validationSchema,
    handleLogoutAllSessions,
    handleDeleteAccount,
  };
};

export default useUserPrivacySettings;
