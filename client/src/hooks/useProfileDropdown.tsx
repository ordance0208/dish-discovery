import { DropdownOptions } from '../models/profileDropdown';
import { UilUser, UilSetting, UilSignout } from '@iconscout/react-unicons';

const useProfileDropdown = () => {
  const dropdownOptions = [
    {
      label: 'Profile',
      value: DropdownOptions.PROFILE,
      icon: <UilUser />,
    },
    {
      label: 'Profile settings',
      value: DropdownOptions.PROFILE_SETTINGS,
      icon: <UilSetting />,
    },
    {
      label: 'Log out',
      value: DropdownOptions.LOG_OUT,
      icon: <UilSignout />,
    },
  ];

  return {
    dropdownOptions,
  };
};

export default useProfileDropdown;
