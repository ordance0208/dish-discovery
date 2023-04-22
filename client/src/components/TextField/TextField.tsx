import { TextField as MuiTextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

export interface TextFieldProps {
  disabled?: boolean;
  onChange?: any;
  value?: string | number;
  label?: string;
  fullWidth?: boolean;
  type?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  InputProps?: any;
  required?: boolean;
  name?: string;
  error?: boolean;
  errorText?: string | boolean;
  className?: string
  touched?: boolean
};

const useStyles = makeStyles({
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 4,               
      },      
    },
    '& .MuiFormControl-root': {
      height: 50,
    },
    '& .MuiInputBase-root': {
      height: 50,
    },
    '& .MuiFormLabel-root': {
      transform: 'translate(14px, 14px)'
    },
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, 14px)'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)'
    },
    '& .MuiFormLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)'
    },
    '& .MuiInputLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)'
    }
  },
});

const TextField = ({
  value,
  label,
  fullWidth,
  disabled,
  onChange,
  type,
  variant,
  required,
  InputProps,
  name,
  error,
  errorText,
  className,
  ...rest
}: TextFieldProps) => {
  const classes = useStyles();

  return (
    <MuiTextField
      name={name}
      value={value}
      label={label}
      error={error}
      helperText={errorText}
      fullWidth={fullWidth}
      disabled={disabled}
      onChange={onChange}
      InputProps={InputProps}
      className={`${classes.textField} ${className}`}
      variant={variant}
      type={type}
      size={'medium'}
      required={required}
      {...rest}
    />
  );
};

export default TextField;
