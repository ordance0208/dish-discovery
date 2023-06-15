import { useRef, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { makeStyles } from '@mui/styles';
import { NEUTRAL } from '../../../../theme';
import useUserPersonalSettings from '../../../../hooks/settings/useUserPersonalSettings';
import { AvatarActions } from '../../../../models/settings';
import { Option } from '../../../../components/Dropdown/Dropdown';
import defaultAvatar from '../../../../assets/img/default-avatar.png';
import TextField from '../../../../components/TextField';
import Button from '../../../../components/Button';
import Typography from '../../../../components/Typography';
import Dropdown from '../../../../components/Dropdown';
import Dialog from '../../../../components/Dialog';

const useStyles = makeStyles({
  personalSettingsContent: {
    width: 500,
    margin: '50px auto',
  },
  userAvatar: {
    borderRadius: '50%',
    height: 200,
    width: 'auto',
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
  option: {
    padding: '4px 8px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: NEUTRAL,
    },
  },
  avatarUpload: {
    display: 'none',
  },
});

const PersonalSettings = () => {
  const classes = useStyles();

  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  const { avatarOptions, initialValues, validationSchema, onProfileUpdate } =
    useUserPersonalSettings();

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
    return (
      <div
        key={option.value}
        className={classes.option}
        onClick={() => handleOptionsClick(option)}
      >
        <Typography>{option.label}</Typography>
      </div>
    );
  };

  return (
    <div className={classes.personalSettingsContent}>
      <Dialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onConfirm={() => setDialogOpened(false)}
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
        />
        <img
          src={defaultAvatar}
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
        {(props: FormikProps<any>) => {
          return (
            <form onSubmit={props.handleSubmit}>
              <div className={classes.personalInfo}>
                <TextField name='firstName' label='First name' />
                <TextField name='lastName' label='Last name' />
                <TextField
                  name='email'
                  label='Email address'
                  className={classes.emailField}
                  type='email'
                />
                <Button
                  disabled={!props.dirty}
                  onClick={props.handleSubmit}
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
  );
};

export default PersonalSettings;
