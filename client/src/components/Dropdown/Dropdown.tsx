import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { NEUTRAL } from '../../theme';
import { ClickAwayListener, Popover } from '@mui/material';
import Typography from '../../components/Typography';

export type Option = {
  label: string;
  value: any;
  icon?: JSX.Element;
};

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  anchorOrigin?: {
    vertical: 'bottom' | 'center' | 'top';
    horizontal: 'center' | 'left' | 'right';
  };
  transformOrigin?: {
    vertical: 'bottom' | 'center' | 'top';
    horizontal: 'center' | 'left' | 'right';
  };
  options?: Option[];
  overrideRenderOptions?: (item: Option) => JSX.Element;
  onClose: () => void;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 4,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
  try: {
    '& .MuiPaper-root': {
      padding: 12,
    },
  },
  option: {
    padding: '4px 8px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: NEUTRAL,
    },
  },
});

const Dropdown = ({
  open,
  children,
  className,
  anchorEl,
  anchorOrigin,
  transformOrigin,
  options,
  overrideRenderOptions,
  onClose,
}: Props) => {
  const classes = useStyles();

  const renderOption = (option: Option) => {
    return (
      <div className={classes.option} key={option.value}>
        <Typography>{option.label}</Typography>
      </div>
    );
  };

  return (
    <ClickAwayListener onClickAway={onClose} mouseEvent='onMouseDown'>
      <Popover
        classes={{ root: classes.try }}
        className={clsx(classes.root, className ? className : null)}
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {options
          ? options.map((option: Option) =>
              overrideRenderOptions
                ? overrideRenderOptions(option)
                : renderOption(option)
            )
          : children}
      </Popover>
    </ClickAwayListener>
  );
};

export default Dropdown;
