import { useEffect, useRef, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { NEUTRAL } from '../../../../theme';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Grid, Theme } from '@mui/material';
import useUserPersonalSettings from '../../../../hooks/settings/useUserPersonalSettings';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import { PersonalInfoPayload } from '../../../../models/user/userSettingsPayloads';
import { AvatarActions } from '../../../../models/settings';
import { Option } from '../../../../components/Dropdown/Dropdown';
import TextField from '../../../../components/TextField';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import Dropdown from '../../../../components/Dropdown';
import Dialog from '../../../../components/Dialog';
import defaultAvatar from '../../../../assets/img/default-avatar.png';

const useStyles = makeStyles((theme: Theme) => ({
  personalSettingsContent: {
    width: 500,
    margin: '50px auto',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  userAvatar: {
    borderRadius: '50%',
    height: 200,
    width: 200,
    display: 'block',
    margin: 'auto',
  },
  avatarWrapper: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    width: 200,
    margin: 'auto',
    '&:hover $editAvatar': {
      display: 'block',
      cursor: 'pointer',
    },
  },
  editAvatar: {
    padding: 8,
    background: 'rgba(0, 0, 0, 0.55)',
    '& > p': {
      color: '#FAFAFA',
    },
    position: 'absolute',
    bottom: 0,
    left: 0,
    textAlign: 'center',
    width: '100%',
    display: 'none',
  },
  personalInfo: {
    marginTop: 50,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 20,
  },
  emailField: {
    gridColumn: '1 / span 2',
  },
  bioField: {
    width: '100%',
    height: 200,
    resize: 'none',
    gridColumn: '1 / span 2',
    fontFamily: 'sans-serif',
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    outline: 'none',
    background: 'transparent',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:focus': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  option: {
    padding: '4px 8px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: NEUTRAL,
    },
  },
  optionDisabled: {
    padding: '4px 8px',
    textAlign: 'center',
    color: 'lightgray',
  },
  avatarUpload: {
    display: 'none',
  },
  circularProgressWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const PersonalSettings = () => {
  const classes = useStyles();

  useDocumentTitle('Personal Settings');

  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const {
    user,
    avatarUrl,
    avatarOptions,
    initialValues,
    validationSchema,
    onProfileUpdate,
    handleAvatarUpload,
    handleRemoveAvatar,
  } = useUserPersonalSettings();

  useEffect(() => {
    setAvatar(avatarUrl || defaultAvatar);
    // eslint-disable-next-line
  }, [user]);

  const handleOptionsClick = (option: Option) => {
    switch (option.value) {
      case AvatarActions.ADD_PROFILE_PICTURE: {
        fileInputRef?.current?.click();
        break;
      }
      case AvatarActions.PREVIEW_PROFILE_PICTURE: {
        return null;
      }
      case AvatarActions.DELETE_PROFILE_PICTURE: {
        setDialogOpened(true);
        break;
      }
    }
    setAnchor(null);
  };

  const overrideRenderOptions = (option: Option) => {
    const disabledOption =
      option.value === AvatarActions.DELETE_PROFILE_PICTURE && !avatarUrl;

    return (
      <div
        key={option.value}
        className={disabledOption ? classes.optionDisabled : classes.option}
        onClick={!disabledOption ? () => handleOptionsClick(option) : undefined}
      >
        <Typography>{option.label}</Typography>
      </div>
    );
  };

  return (
    <>
      {user ? (
        <div className={classes.personalSettingsContent}>
          <Dialog
            open={dialogOpened}
            onClose={() => setDialogOpened(false)}
            onConfirm={() => {
              handleRemoveAvatar();
              setDialogOpened(false);
            }}
            title='Remove your profile picture'
            confirmButtonColor='warning'
          >
            <Typography>
              Are you sure that you want to remove your profile picture?
            </Typography>
          </Dialog>
          <div className={classes.avatarWrapper}>
            <input
              type='file'
              accept='image/*'
              className={classes.avatarUpload}
              ref={fileInputRef}
              onChange={(e: any) => handleAvatarUpload(e.target.files[0])}
            />
            <img
              src={avatar}
              className={classes.userAvatar}
              alt='user avatar'
            />
            <div
              className={classes.editAvatar}
              onClick={(e: any) => setAnchor(e.currentTarget)}
            >
              <Typography>Edit</Typography>
            </div>
          </div>
          <Dropdown
            anchorEl={anchor!}
            open={!!anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            options={avatarOptions}
            overrideRenderOptions={overrideRenderOptions}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onProfileUpdate}
            enableReinitialize
          >
            {({
              handleSubmit,
              handleChange,
              dirty,
              values: { firstName, lastName, email, bio },
            }: FormikProps<PersonalInfoPayload>) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className={classes.personalInfo}>
                    <TextField name='firstName' label='First name' />
                    <TextField name='lastName' label='Last name' />
                    <TextField
                      name='email'
                      label='Email address'
                      className={classes.emailField}
                      type='email'
                    />
                    <textarea
                      name='bio'
                      value={bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        handleChange(e);
                      }}
                      maxLength={320}
                      className={classes.bioField}
                    ></textarea>
                    <Button
                      disabled={!dirty || !firstName || !lastName || !email}
                      onClick={handleSubmit}
                      type='submit'
                      className={classes.emailField}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <Grid className={classes.circularProgressWrapper}>
          <CircularProgress size={100} />
        </Grid>
      )}
    </>
  );
};

export default PersonalSettings;
