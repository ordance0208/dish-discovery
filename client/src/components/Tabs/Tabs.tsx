import { useState } from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { NEUTRAL } from '../../theme';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

type Tab = {
  label: string;
  icon?: JSX.Element;
};

interface Props {
  tabs: Tab[];
  orientation?: 'vertical' | 'horizontal';
  setTabsExternal: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  tabLabel: {
    fontSize: 15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      textAlign: 'center'
    },
    textTransform: 'none',
    color: theme.palette.text.primary,
  },
  tabButton: {
    borderRadius: 8,
    marginBottom: 4,
    justifyContent: 'flex-start',
  },
  selected: {
    background: NEUTRAL,
    '& $tabLabel': {
      color: theme.palette.primary.main,
    },
  },
  root: {
    flex: 1
  }
}));

const Tabs = ({ tabs, orientation, setTabsExternal }: Props) => {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (e: any, newValue: number) => {
    setTab(newValue);
    setTabsExternal(newValue);
  };

  return (
    <MuiTabs orientation={orientation} value={tab} onChange={handleTabChange}>
      {tabs.map((tab: Tab) => (
        <MuiTab
          key={tab.label}
          disableRipple
          classes={{ selected: classes.selected, root: classes.root }}
          iconPosition='start'
          icon={tab?.icon}
          className={classes.tabButton}
          label={<span className={classes.tabLabel}>{tab.label}</span>}
        />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
