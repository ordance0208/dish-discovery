import { IconButton as MuiIconButton } from '@mui/material';

interface Props {
  children?: JSX.Element;
  className?: string;
	onClick?: any
}

const IconButton = ({ children, className, onClick }: Props) => {
  return (
    <MuiIconButton
      className={className}
			onClick={onClick}
      disableFocusRipple
      disableTouchRipple
    >
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
