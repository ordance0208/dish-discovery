import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useSnackbar from '../useSnackbar';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { LoginFields } from '../../models/authPayloads';
import { IResponse } from '../../models/response';
import { PATHS } from '../../routes';

const useSigninForm = (
  setResponse: React.Dispatch<React.SetStateAction<IResponse | undefined>>
) => {
  const { loginUser } = useAuthActions();
  const navigate = useNavigate();
  const queueSnackbar = useSnackbar();

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

  const handleLogin = async (values: LoginFields) => {
    try {
      await loginUser(values);
      navigate(PATHS.RECIPES);
      queueSnackbar({
        text: 'User authenticated successfully',
        severity: 'success',
      });
    } catch (err: any) {
      setResponse({ severity: 'warning', text: err.message });
    }
  };

  return {
    initialValues,
    validationSchema,
    handleLogin,
  };
};

export default useSigninForm;
