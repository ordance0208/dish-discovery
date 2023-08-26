import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';

const IconButton = (props: IconButtonProps) => {
  return (
    <MuiIconButton disableFocusRipple disableTouchRipple {...props}>
      {props.children}
    </MuiIconButton>
  );
};

export default IconButton;
