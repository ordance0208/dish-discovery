import { Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Typography from '../Typography';

interface AuthViewProps {
  initialValues: any;
  validationSchema: any;
  isLogin: boolean;
  children: (props: any) => JSX.Element;
  handleSubmit: (values: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  authView: {
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
      padding: 16,
    },
    background: theme.palette.background.default,
    padding: 32,
  },
  greeting: {
    width: 600,
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    marginBottom: 32,
    color: '#333',
    textAlign: 'center',
    '& :nth-child(1)': {
      [theme.breakpoints.down('sm')]: {
        fontSize: 22,
      },
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.1,
    },
  },
}));

const AuthView = ({
  initialValues,
  validationSchema,
  children,
  isLogin,
  handleSubmit,
}: AuthViewProps) => {
  const classes = useStyles();

  return (
    <div className={classes.authView}>
      <div className={classes.greeting}>
        <Typography>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </Typography>
      </div>
      <div className={classes.signUpCard}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {children}
        </Formik>
      </div>
    </div>
  );
};

export default AuthView;
