import { useAuthContext } from './context';

export const useAuthData = () => {
  const { auth } = useAuthContext();

  return {
    user: auth.user,
    loading: auth.loading,
  };
};
