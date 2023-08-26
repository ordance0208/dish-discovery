import { Typography as MuiTypography, TypographyProps } from '@mui/material';

const Typography = (props: TypographyProps) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};

export default Typography;
