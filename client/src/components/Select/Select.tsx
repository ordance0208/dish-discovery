import clsx from 'clsx';
import { MenuItem, Select as MuiSelect, SelectProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Option } from '../Dropdown/Dropdown';

const useStyles = makeStyles({
  textField: {
    height: 50,
  },
});

interface Props extends SelectProps {
  options: Option[];
  className?: string;
}

const Select = ({ options, className, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <MuiSelect className={clsx(classes.textField, className)} {...rest}>
      {options.map((option: Option, index: number) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

export default Select;
