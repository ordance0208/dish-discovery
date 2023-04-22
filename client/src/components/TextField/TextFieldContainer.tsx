import { useField } from 'formik';
import TextField from './TextField';
import { TextFieldProps } from './TextField';

interface Props extends TextFieldProps {
  name: string;
  value?: string | number;
  touched?: boolean;
  error?: boolean;
  errorText?: string;
	onChange?: (e: MouseEvent) => void
}

const TextFieldContainer = ({
  name,
  value,
  touched,
  errorText,
  error,
	onChange,
  ...rest
}: Props) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      name={field.name}
      value={value || field.value}
      touched={touched || meta.touched}
      error={error || (!!meta.error && meta.touched)}
      errorText={errorText || (meta.touched && meta.error)}
			onChange={onChange || field.onChange}
      {...rest}
    />
  );
};

export default TextFieldContainer;
