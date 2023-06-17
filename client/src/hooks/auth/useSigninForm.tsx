import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { PATHS } from '../../routes';

const useSigninForm = (setLoginError : React.Dispatch<React.SetStateAction<string | null>>) => {
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
    } catch (err: any) {      
      setLoginError(err.message)
    }
  };

  return {
    initialValues,
    validationSchema,
    handleLogin,
  };
};

export default useSigninForm;
