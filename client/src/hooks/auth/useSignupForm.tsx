import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { RegisterFields } from '../../models/authPayloads';
import { IResponse } from '../../models/response';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { PATHS } from '../../routes';

const useSignupForm = (
  setResponse: React.Dispatch<React.SetStateAction<IResponse | undefined>>
) => {
  const { registerUser } = useAuthActions();
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1)
      .max(20, 'Your first name cannot exceed 20 characters')
      .required('Please enter your first name'),
    lastName: Yup.string()
      .min(1)
      .max(20, 'Your last name cannot exceed 20 characters')
      .required('Please enter your last name'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
    password: Yup.string()
      .matches(
        // eslint-disable-next-line
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and a special character'
      )
      .required('Please enter a password'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], "Passwords don't match"),
  });

  const handleSignup = async (values: RegisterFields) => {
    try {
      await registerUser(values);
      navigate(PATHS.HOME, { replace: true });
    } catch (err: any) {
      setResponse({ severity: 'warning', text: err.message });
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSignup,
  };
};

export default useSignupForm;
