import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { PATHS } from '../../routes';

const useSigninForm = () => {
  const { loginUser } = useAuthActions();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Enter your email address'),
    password: Yup.string().required('Enter your password'),
  });

  const handleLogin = async (values: any) => {
    try {
      await loginUser(values);
      navigate(PATHS.HOME)
    } catch (err) {
      console.log(`Error logging in: ${err}`);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleLogin,
  };
};

export default useSigninForm;
