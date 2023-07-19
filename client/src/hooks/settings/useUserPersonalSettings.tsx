import * as Yup from 'yup';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { useAuthData } from '../../utils/AuthContext/selectors';
import { avatarOptions } from '../../utils/settings.helpers';
import { PersonalInfoPayload } from '../../models/user/userSettingsPayloads';
import { IResponse } from '../../models/response';

const useUserPersonalSettings = (
  setResponse: React.Dispatch<React.SetStateAction<IResponse | undefined>>
) => {
  const { user } = useAuthData();

  const { updateUserInfo, uploadUserAvatar, removeUserAvatar } =
    useAuthActions();

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

  const handleErrorResponse = (text: string) => {
    setResponse({ severity: 'warning', text });
  };

  const handleSuccessResponse = (text: string) => {
    setResponse({ severity: 'success', text });
  };

  const onProfileUpdate = async (values: PersonalInfoPayload) => {
    try {
      await updateUserInfo(values);
      handleSuccessResponse('Profile info updated successfully!');
    } catch (err: any) {
      handleErrorResponse(err.message);
    }
  };

  const handleAvatarUpload = async (file: any) => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      await uploadUserAvatar(formData);
      handleSuccessResponse('Avatar uploaded successfully!');
    } catch (err: any) {
      handleErrorResponse(err.message);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await removeUserAvatar();
      handleSuccessResponse('Avatar removed successfully!');
    } catch (err: any) {
      handleErrorResponse(err.message);
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
