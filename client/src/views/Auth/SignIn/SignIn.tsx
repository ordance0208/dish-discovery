import useSigninForm from '../../../hooks/auth/useSigninForm';
import AuthView from '../../../components/AuthView';
import TextField from '../../../components/TextField';
import PasswordField from '../../../components/PasswordField';
import Button from '../../../components/Button';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Typography from '../../../components/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  signinForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  noAccount: {
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
}));

const SignIn = () => {
  const classes = useStyles();
  const { initialValues, validationSchema, handleLogin } = useSigninForm();

  return (
    <AuthView
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleLogin}
      isLogin
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className={classes.signinForm}>
          <TextField
            name='email'
            type='email'
            fullWidth
            label='Email address'
            required
          />
          <PasswordField name='password' />
          <Button onClick={props.handleSubmit} fullWidth>
            Sign in
          </Button>
          <Typography className={classes.noAccount}>
            Don't have an account?{' '}
            <Link to='/register' className={classes.signupLink}>
              Sign up
            </Link>
          </Typography>
        </form>
      )}
    </AuthView>
  );
};

export default SignIn;
