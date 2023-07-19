import { UilUser, UilLock } from '@iconscout/react-unicons';

const useUserSettingsTabs = () => {
  const userSettingsTabs = [
    {
      label: 'Personal settings',
      icon: <UilUser />,
    },
    {
      label: 'Privacy settings',
      icon: <UilLock />,
    },
  ];

  return {
    userSettingsTabs,
  };
};

export default useUserSettingsTabs;
