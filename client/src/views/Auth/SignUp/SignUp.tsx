import { Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import useSignupForm from '../../../hooks/auth/useSignupForm';
import { Link } from 'react-router-dom';
import TextField from '../../../components/TextField';
import PasswordField from '../../../components/PasswordField';
import Button from '../../../components/Button';
import Typography from '../../../components/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  signup: {
    width: '100vw',
    height: 'calc(100vh - 71px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100% - 71px)',
    },
    padding: '16px 0',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpCard: {
    borderRadius: 4,
    boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.15)',
    width: 600,
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 16
    },
    background: theme.palette.background.default,
    padding: 32,
  },
  signupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  fullName: {
    display: 'flex',
    gap: 24,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
  },
  name: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Helvetica',
    color: theme.palette.primary.main,
    display: 'inline-block',
    marginTop: -10,
  },
  greeting: {
    width: 600,
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginBottom: 16
    },
    marginBottom: 32,
    color: '#333',
    textAlign: 'center',
    '& :nth-child(1)': {
      [theme.breakpoints.down('sm')]: {
        fontSize: 22
      },
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.1,
    }
  },
  signIn: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center',
    color: '#333'
  }
}));

const SignUp = () => {
  const classes = useStyles();

  const { initialValues, validationSchema, handleSignup } = useSignupForm();

  return (
    <div className={classes.signup}>
      <div className={classes.greeting}>
        <Typography>Create your account</Typography>
      </div>
      <div className={classes.signUpCard}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {(props: any) => {
            return (
              <form
                onSubmit={props.handleSubmit}
                className={classes.signupForm}
              >
                <div className={classes.fullName}>
                  <TextField
                    className={classes.name}
                    label='First name'
                    name='firstName'
                  />
                  <TextField
                    className={classes.name}
                    label='Last name'
                    name='lastName'
                  />
                </div>
                <TextField label='Email address' name='email' />
                <PasswordField name='password' label='Password' />
                <PasswordField
                  name='confirmPassword'
                  label='Confirm password'
                />
                <Button onClick={props.handleSubmit}>Sign Up</Button>
                <Typography className={classes.signIn}>Already have an account? <Link to='/login' className={classes.link}>Log in</Link></Typography>
                {/* <Link className={classes.link} to='/login'>
                  Already have an account? Click here to log in.
                </Link> */}
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
