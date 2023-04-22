import { IconButton, InputAdornment } from '@mui/material';
import TextField from '../TextField/TextField';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import { useState } from 'react';

export interface PasswordFieldProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: any;
  error?: boolean;
  errorText?: string | boolean;
  touched?: boolean;
}

const PasswordField = ({
  label = 'Password',
  name,
  value,
  onChange,
  error,
  errorText,
  touched,
}: PasswordFieldProps) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <TextField
      type={passwordShown ? 'text' : 'password'}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required
      error={error}
      errorText={errorText}
      fullWidth
      touched={touched}
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
    />
  );
};

export default PasswordField;
