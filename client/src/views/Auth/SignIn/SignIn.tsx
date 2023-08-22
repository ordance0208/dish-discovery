import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useSigninForm from '../../../hooks/auth/useSigninForm';
import { IResponse } from '../../../models/response';
import AuthView from '../../../components/AuthView';
import TextField from '../../../components/TextField';
import PasswordField from '../../../components/PasswordField';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import Alert from '../../../components/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  signinForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  notRegisteredText: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
    color: '#333',
  },
  signupLink: {
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  alert: {
    marginTop: 16,
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [response, setResponse] = useState<IResponse | undefined>();

  useEffect(() => {
    if (!response) return;

    setTimeout(() => {
      setResponse(undefined);
    }, 5000);
  }, [response]);
  const { initialValues, validationSchema, handleLogin } =
    useSigninForm(setResponse);

  return (
    <AuthView
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleLogin}
      isLogin
    >
      {(props) => (
        <>
          <form onSubmit={props.handleSubmit} className={classes.signinForm}>
            <TextField
              name='email'
              type='email'
              fullWidth
              label='Email address'
              required
            />
            <PasswordField name='password' />
            <Button
              onClick={props.handleSubmit}
              fullWidth
              type='submit'
              disabled={props.isSubmitting}
            >
              Sign in
            </Button>
            <Typography className={classes.notRegisteredText}>
              Don't have an account?{' '}
              <Link to='/register' className={classes.signupLink}>
                Sign up
              </Link>
            </Typography>
          </form>
          {response && (
            <Alert className={classes.alert} severity={response.severity}>
              {response.text}
            </Alert>
          )}
        </>
      )}
    </AuthView>
  );
};

export default SignIn;
