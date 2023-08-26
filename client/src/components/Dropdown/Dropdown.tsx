import clsx from 'clsx';
import { NEUTRAL } from '../../theme';
import { makeStyles } from '@mui/styles';
import { ClickAwayListener, Popover, PopoverProps } from '@mui/material';
import Typography from '../../components/Typography';

export type Option = {
  label: string;
  value: any;
  icon?: JSX.Element;
};

interface Props extends PopoverProps {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  options?: Option[];
  overrideRenderOptions?: (item: Option) => JSX.Element;
  onOptionClick?: (item: Option) => void;
  onClose: () => void;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 4,
  },
  paperRoot: {
    '& .MuiPaper-root': {
      marginTop: 10,
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 12px 0px',
      padding: 12,
    },
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '4px 8px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: NEUTRAL,
    },
  },
});

const Dropdown = ({
  children,
  className,
  options,
  overrideRenderOptions,
  onOptionClick,
  onClose,
  ...rest
}: Props) => {
  const classes = useStyles();

  const renderOption = (option: Option) => {
    return (
      <div
        className={classes.option}
        key={option.value}
        onClick={() => onOptionClick?.(option)}
      >
        <Typography>{option.label}</Typography>
        {option.icon && option.icon}
      </div>
    );
  };

  return (
    <ClickAwayListener onClickAway={onClose} mouseEvent='onMouseDown'>
      <Popover
        classes={{ root: classes.paperRoot }}
        className={clsx(classes.root, className ? className : null)}
        onClose={onClose}
        {...rest}
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
