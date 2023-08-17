import { Chip as MuiChip, ChipProps } from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    borderRadius: 4,
  },
}));

const Chip = (props: ChipProps) => {
  const classes = useStyles();

  return <MuiChip className={classes.chip} {...props} />;
};

export default Chip;
