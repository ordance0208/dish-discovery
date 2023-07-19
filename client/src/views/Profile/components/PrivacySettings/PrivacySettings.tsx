import { useEffect, useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TEXT_DARK } from '../../../../theme';
import useUserPrivacySettings from '../../../../hooks/settings/useUserPrivacySettings';
import Typography from '../../../../components/Typography';
import PasswordField from '../../../../components/PasswordField';
import Button from '../../../../components/Button';
import Dialog from '../../../../components/Dialog';
import { PasswordPayload } from '../../../../models/user/userSettingsPayloads';
import { IResponse } from '../../../../models/response';
import Alert from '../../../../components/Alert';

const useStyles =  makeStyles((theme: Theme) => ({
  privacySettingsContent: {
    width: 500,
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    margin: '50px auto',
  },
  subtitle: {
    fontWeight: 600,
    fontSize: 16,
    color: TEXT_DARK,
  },
  passwordFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginTop: 24,
  },
  section: {
    marginBottom: 50,
  },
  red: {
    fontSize: 12,
    color: 'red',
    marginBottom: 12,
  },
  dialogText: {
    color: TEXT_DARK,
  },
  changeButton: {
    alignSelf: 'flex-start',
  },
  alert: {
    marginTop: 20
  }
}));

const PrivacySettings = () => {
  const classes = useStyles();
  const [action, setAction] = useState<'logout' | 'delete' | null>(null);

  const [response, setResponse] = useState<IResponse | undefined>();

  useEffect(() => {
    if (!response) return;

    setTimeout(() => {
      setResponse(undefined);
    }, 5000);
  }, [response]);

  const {
    initialValues,
    validationSchema,
    handlePasswordChange,
    handleLogoutAllSessions,
    handleDeleteAccount,
  } = useUserPrivacySettings(setResponse);


  return (
    <div className={classes.privacySettingsContent}>
      <div className={classes.section}>
        <Typography className={classes.subtitle}>
          Change your password
        </Typography>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { resetForm }: FormikHelpers<any>) =>
              handlePasswordChange(values, resetForm)
            }
          >
            {({
              handleSubmit,
              dirty,
              values: { currentPassword, newPassword, confirmNewPassword },
            }: FormikProps<PasswordPayload>) => {
              return (
                <form
                  className={classes.passwordFieldContainer}
                  onSubmit={handleSubmit}
                >
                  <PasswordField
                    name='currentPassword'
                    label='Current password'
                  />
                  <PasswordField name='newPassword' label='New password' />
                  <PasswordField
                    name='confirmNewPassword'
                    label='Confirm new password'
                  />
                  <Button
                    className={classes.changeButton}
                    disabled={
                      !dirty ||
                      !currentPassword ||
                      !newPassword ||
                      !confirmNewPassword
                    }
                    type='submit'
                  >
                    Change password
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className={classes.section}>
        <Typography className={classes.subtitle}>
          Log out of all sessions
        </Typography>
        <Typography className={classes.red}>
          This action will log you out from your current session as well.
        </Typography>
        <Button color='warning' onClick={() => setAction('logout')}>
          Log out
        </Button>
      </div>
      <div className={classes.section}>
        <Typography className={classes.subtitle}>Delete account</Typography>
        <Typography className={classes.red}>
          This action will permamently delete your account and you will not be
          able to log in again.
        </Typography>
        <Button color='warning' onClick={() => setAction('delete')}>
          Delete account
        </Button>
      </div>
      {response && (
            <Alert className={classes.alert} severity={response.severity}>
              {response.text}
            </Alert>
          )}
      <Dialog
        open={!!action}
        onClose={() => setAction(null)}
        onConfirm={
          action === 'delete' ? handleDeleteAccount : handleLogoutAllSessions
        }
        title={
          action === 'delete'
            ? 'Delete Your account'
            : 'Log out of all sessions'
        }
        confirmButtonColor='warning'
      >
        <Typography className={classes.dialogText}>
          {action === 'delete'
            ? 'Are you sure you want to delete your account?'
            : 'Are you sure you want to log out of all sessions?'}
        </Typography>
      </Dialog>
    </div>
  );
};

export default PrivacySettings;
