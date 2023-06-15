import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import useProfileDropdown from '../../hooks/useProfileDropdown';
import { useAuthActions } from '../../utils/AuthContext/actions';
import { Option } from '../Dropdown/Dropdown';
import { DropdownOptions } from '../../models/profileDropdown';
import { AUTH_PATHS, PATHS } from '../../routes';
import { UilAngleDown, UilAngleUp } from '@iconscout/react-unicons';
import Dropdown from '../Dropdown';
import defaultAvatar from '../../assets/img/default-avatar.png';

const useStyles = makeStyles({
  profileDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: '50%',
  },
});

const ProfileDropdown = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { dropdownOptions } = useProfileDropdown();

  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const { logoutUser } = useAuthActions();

  const onOptionClick = async (option: Option) => {
    switch (option.value) {
      case DropdownOptions.PROFILE: {
        navigate(PATHS.PROFILE);
        break;
      }
      case DropdownOptions.PROFILE_SETTINGS: {
        navigate(PATHS.PROFILE_SETTINGS);
        break;
      }
      case DropdownOptions.LOG_OUT: {
        await logoutUser();
        navigate(AUTH_PATHS.LOGIN);
        break;
      }
    }
  };

  return (
    <div
      className={classes.profileDropdown}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        setDropdownOpened(!dropdownOpened);
        setAnchorEl(anchorEl ? null : e.currentTarget);
      }}
    >
      <img className={classes.avatar} src={defaultAvatar} alt='user avatar' />
      {anchorEl ? <UilAngleUp /> : <UilAngleDown />}
      <Dropdown
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        options={dropdownOptions}
        onOptionClick={onOptionClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </div>
  );
};

export default ProfileDropdown;
