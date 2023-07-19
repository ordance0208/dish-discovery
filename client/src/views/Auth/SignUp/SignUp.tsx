import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import useSignupForm from '../../../hooks/auth/useSignupForm';
import { IResponse } from '../../../models/response';
import TextField from '../../../components/TextField';
import PasswordField from '../../../components/PasswordField';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';
import AuthView from '../../../components/AuthView';
import Alert from '../../../components/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  signupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  fullName: {
    display: 'flex',
    gap: 24,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  name: {
    flex: 1,
  },
  haveAccount: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
    color: '#333',
  },
  signinLink: {
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  alert: {
    marginTop: 16,
  },
}));

const SignUp = () => {
  const classes = useStyles();

  
  const [response, setResponse] = useState<IResponse | undefined>();

  useEffect(() => {
    if (!response) return;

    setTimeout(() => {
      setResponse(undefined);
    }, 5000);
  }, [response]);
  
  const { initialValues, validationSchema, handleSignup } = useSignupForm(setResponse);

  return (
    <AuthView
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSignup}
      isLogin={false}
    >
      {(props: any) => (
        <>
          <form onSubmit={props.handleSubmit} className={classes.signupForm}>
            <div className={classes.fullName}>
              <TextField
                className={classes.name}
                label='First name'
                name='firstName'
                required
              />
              <TextField
                className={classes.name}
                label='Last name'
                name='lastName'
                required
              />
            </div>
            <TextField
              label='Email address'
              name='email'
              type='email'
              required
            />
            <PasswordField name='password' label='Password' />
            <PasswordField name='confirmPassword' label='Confirm password' />
            <Button
              disabled={props.isSubmitting}
              onClick={props.handleSubmit}
              type='submit'
            >
              Sign Up
            </Button>
            <Typography className={classes.haveAccount}>
              Already have an account?{' '}
              <Link to='/login' className={classes.signinLink}>
                Log in
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

export default SignUp;
