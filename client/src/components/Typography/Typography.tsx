import { Typography as MuiTypography } from '@mui/material';

interface Props {
  children?: any;
  className?: string;
}

const Typography = ({ children, className }: Props) => {
  return <MuiTypography className={className}>{children}</MuiTypography>;
};

export default Typography;
