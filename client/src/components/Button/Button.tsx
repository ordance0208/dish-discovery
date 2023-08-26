import { Button as MuiButton, ButtonProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { WHITE } from '../../theme';

interface Props extends ButtonProps {
  children?: string | React.ReactNode;
  className?: string;
  textColor?: string;
  onClick?: () => any;
}

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
  children,
  className,
  variant = 'contained',
  color = 'primary',
  textColor,
  onClick,
  ...rest
}: Props) => {
  const classes = useStyles({ textColor });

  return (
    <MuiButton
      className={`${classes.button} ${className}`}
      disableElevation
      disableRipple
      variant={variant}
      color={color}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
