import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WHITE } from '../../theme';

type ButtonProps = {
  variant?: 'contained' | 'outlined' | 'text';
  color?:
    | 'inherit'
    | 'secondary'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  type?: 'submit' | 'reset' | 'button';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: string | React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  textColor?: string;
  onClick?: () => any;
  className?: string;
};

interface StyleProps {
  textColor: string | undefined;
}

const useStyles = makeStyles({
  button: {
    '&.MuiButton-root': {
      textTransform: 'none',
      borderRadius: 4,
      fontWeight: 600,
      color: ({ textColor }: StyleProps) => textColor || WHITE,
      fontSize: 16,
    },
  },
});

const Button = ({
  variant = 'contained',
  children,
  color = 'primary',
  startIcon,
  endIcon,
  fullWidth,
  disabled,
  type,
  className,
  textColor,
  onClick,
}: ButtonProps) => {
  const classes = useStyles({ textColor });

  return (
    <MuiButton
      disableElevation
      className={`${classes.button} ${className}`}
      fullWidth={fullWidth}
      disableRipple
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
