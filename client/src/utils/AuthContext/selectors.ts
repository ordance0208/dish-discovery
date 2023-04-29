import { useAuthContext } from './context';

export const useAuthData = () => {
	const { auth, loading } = useAuthContext()

	return {
		auth,
		loading
	}
};
