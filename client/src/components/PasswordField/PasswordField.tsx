import { useState } from 'react';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import { IconButton, InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '../TextField/TextField';

const PasswordField = ({ label = 'Password', ...rest }: TextFieldProps) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <TextField
      type={passwordShown ? 'text' : 'password'}
      label={label}
      required
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              disableRipple
              onClick={() => setPasswordShown((prev) => !prev)}
            >
              {passwordShown ? <UilEye /> : <UilEyeSlash />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default PasswordField;
