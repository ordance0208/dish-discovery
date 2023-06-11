import { AvatarActions } from '../models/settings';

export const avatarOptions = [
  {
    label: 'Add profile picture',
    value: AvatarActions.ADD_PROFILE_PICTURE,
  },
  {
    label: 'Preview profile picture',
    value: AvatarActions.PREVIEW_PROFILE_PICTURE,
  },
  {
    label: 'Remove profile picture',
    value: AvatarActions.DELETE_PROFILE_PICTURE,
  },
];
