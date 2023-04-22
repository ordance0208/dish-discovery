import { useField } from 'formik';
import PasswordField, { PasswordFieldProps } from './PasswordField';

interface Props extends PasswordFieldProps {
  name: string;
  value?: string;
  touched?: boolean;
  error?: boolean;
  errorText?: string;
}

const PasswordFieldContainer = ({
  name,
  value,
  touched,
  error,
  errorText,
  ...rest
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <PasswordField
      name={field.name}
      value={field.value}
      touched={touched || meta.touched}
      error={error || (!!meta.error && meta.touched)}
      errorText={errorText || (meta.touched && meta.error)}			
			onChange={field.onChange}
      {...rest}
    />
  );
};

export default PasswordFieldContainer;
