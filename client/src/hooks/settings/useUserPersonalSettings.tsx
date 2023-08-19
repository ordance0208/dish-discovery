import * as Yup from 'yup';
import useSnackbar from '../useSnackbar';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { useAuthData } from '../../utils/AuthContext/selectors';
import { avatarOptions } from '../../utils/settings.helpers';
import { PersonalInfoPayload } from '../../models/user/userSettingsPayloads';

const useUserPersonalSettings = () => {
  const { user } = useAuthData();

  const { updateUserInfo, uploadUserAvatar, removeUserAvatar } =
    useAuthActions();

  const queueSnackbar = useSnackbar();

  const avatarUrl = user?.avatar;

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter first name'),
    lastName: Yup.string().required('Please enter last name'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter an email address'),
  });

  const onProfileUpdate = async (values: PersonalInfoPayload) => {
    try {
      await updateUserInfo(values);
      queueSnackbar({
        text: 'Profile info updated successfully',
        severity: 'success',
      });
    } catch (err: any) {
      queueSnackbar({ text: err.message, severity: 'success' });
    }
  };

  const handleAvatarUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      await uploadUserAvatar(formData);
      queueSnackbar({
        text: 'Avatar uploaded successfully!',
        severity: 'success',
      });
    } catch (err: any) {
      queueSnackbar({
        text: err.message,
        severity: 'success',
      });
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await removeUserAvatar();
      queueSnackbar({
        text: 'Avatar removed successfully!',
        severity: 'success',
      });
    } catch (err: any) {
      queueSnackbar({
        text: err.message,
        severity: 'success',
      });
    }
  };

  return {
    avatarOptions,
    initialValues,
    validationSchema,
    avatarUrl,
    user,
    onProfileUpdate,
    handleAvatarUpload,
    handleRemoveAvatar,
  };
};

export default useUserPersonalSettings;
