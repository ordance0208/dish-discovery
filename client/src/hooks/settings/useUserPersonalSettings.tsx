import * as Yup from 'yup';
import { useAuthData } from '../../utils/AuthContext/selectors';
import { avatarOptions } from '../../utils/settings.helpers';

const useUserPersonalSettings = () => {
  const { user } = useAuthData();

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

  const onProfileUpdate = (values: any) => {
    console.log(values);
  };

  return {
    avatarOptions,
    initialValues,
    validationSchema,
    onProfileUpdate,
  };
};

export default useUserPersonalSettings;
