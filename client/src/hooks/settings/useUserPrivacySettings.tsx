import { useAuthActions } from '../../utils/AuthContext/actions';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS } from '../../routes';

const useUserPrivacySettings = () => {
  const navigate = useNavigate();
  const { logoutAllSessions } = useAuthActions();

  const handleLogoutAllSessions = async () => {
    await logoutAllSessions();
    navigate(AUTH_PATHS.LOGIN);
  };

  const handleDeleteAccount = async () => {};

  return {
    handleLogoutAllSessions,
		handleDeleteAccount
  };
};

export default useUserPrivacySettings;
