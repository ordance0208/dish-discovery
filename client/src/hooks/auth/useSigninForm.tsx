import * as Yup from 'yup';

const useSigninForm = () => {
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

  const handleLogin = (values: any) => {};

  return {
    initialValues,
    validationSchema,
    handleLogin,
  };
};

export default useSigninForm;
