import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import useUserSettingsTabs from '../../hooks/settings/useUserSettingsTabs';
import Tabs from '../../components/Tabs';
import PersonalSettings from './components/PersonalSettings';
import PrivacySettings from './components/PrivacySettings';

const useStyles = makeStyles((theme: Theme) => ({
  profileView: {
    display: 'flex',
    maxWidth: 1440,
    margin: 'auto',
    height: '100vh',
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
  },
  tabsContainer: {
    width: 275,
    borderRight: '2px solid #dedede',
  },
  selectedTab: {
    width: '100%',
  },
}));

const ProfileSettings = () => {
  const classes = useStyles();

  const [tab, setTab] = useState<number>(0);
  const { userSettingsTabs } = useUserSettingsTabs();

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <PersonalSettings />;
      case 1:
        return <PrivacySettings />
    }
  };

  return (
    <div className={classes.profileView}>
      <div className={classes.tabsContainer}>
        <Tabs
          tabs={userSettingsTabs}
          setTabsExternal={setTab}
          orientation='vertical'
        />
      </div>
      <div className={classes.selectedTab}>{renderTab()}</div>
    </div>
  );
};

export default ProfileSettings;
