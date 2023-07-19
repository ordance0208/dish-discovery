import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import useUserSettingsTabs from '../../hooks/settings/useUserSettingsTabs';
import Tabs from '../../components/Tabs';
import PersonalSettings from './components/PersonalSettings';
import PrivacySettings from './components/PrivacySettings';

const useStyles = makeStyles((theme: Theme) => ({
  profileView: {
    display: 'flex',
    maxWidth: 1440,
    width: '100%',
    margin: 'auto',
    height: 'calc(100vh - 71px)',
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  tabsContainer: {
    width: 275,
    borderRight: '2px solid #dedede',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
      width: '100%',
      '& button': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 10px'
      }
    },
  },
  tabContainer: {
    width: '100%',
  },
}));

const ProfileSettings = () => {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [tab, setTab] = useState<number>(0);
  const { userSettingsTabs } = useUserSettingsTabs();

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <PersonalSettings />;
      case 1:
        return <PrivacySettings />;
    }
  };

  return (
    <div className={classes.profileView}>
      <div className={classes.tabsContainer}>
        <Tabs
          tabs={userSettingsTabs}
          setTabsExternal={setTab}
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        />
      </div>
      <div className={classes.tabContainer}>{renderTab()}</div>
    </div>
  );
};

export default ProfileSettings;
