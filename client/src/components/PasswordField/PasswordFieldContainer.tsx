import { useField } from 'formik';
import { TextFieldProps } from '../TextField/TextField';
import PasswordField from './PasswordField';

interface Props extends TextFieldProps {
  name: string;
}

const PasswordFieldContainer = ({
  name,
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
