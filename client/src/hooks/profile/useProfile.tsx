import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSnackbar from '../useSnackbar';
import { useAuthData } from '../../utils/AuthContext/selectors';
import { IRecipe } from '../../models/recipe';
import { getUserProfile } from '../../endpoints/profile';
import { PATHS } from '../../routes';

const useProfile = () => {
  const { user } = useAuthData();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const id =
    pathname === `${PATHS.PROFILE_ME}` ? user._id : pathname.split('/').pop();

  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const queueSnackbar = useSnackbar();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getUserProfile(id);

        const profileData = {
          ...data.user,
          userRecipes: data.userRecipes,
          posts: data.userRecipes.length,
          views: data.userRecipes.reduce(
            (acc: number, currentValue: IRecipe) => acc + currentValue.views,
            0
          ),
          isSelf: user ? data.user._id === user._id : false,
        };

        setProfile(profileData);
      } catch (err: any) {
        if (err.response.status === 404) {
          return navigate(PATHS.NOT_FOUND, { replace: true });
        }

        queueSnackbar({ text: err.response.data.error, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    getProfile();
    // eslint-disable-next-line
  }, [pathname]);

  return { profile, loading };
};

export default useProfile;
