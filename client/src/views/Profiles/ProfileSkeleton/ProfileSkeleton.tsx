import { Skeleton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileSection: {
    display: 'flex',
    gap: 32,
    marginBottom: 40,
    height: 300,
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  userAvatarSkeleton: {
    height: 300,
    width: 300,
  },
  userInfoSkeleton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  userNameSkeleton: {
    marginTop: 5,
    width: 180,
    height: 24,
    borderRadius: '4px/6.7px',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
    },
  },
  userStatsWrapper: {
    display: 'flex',
    gap: 24,
    marginTop: 8,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  userStatsSkeleton: {
    width: 70,
    height: 24,
    borderRadius: '4px/6.7px',
  },
  textareaSkeleton: {
    marginTop: 16,
    width: 470,
    height: 'calc(100% - 77px)',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 200,
    },
  },
}));

const ProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.profileSection}>
      <Skeleton className={classes.userAvatarSkeleton} variant='rectangular' />
      <div className={classes.userInfoSkeleton}>
        <Skeleton className={classes.userNameSkeleton} variant='rectangular' />
        <div className={classes.userStatsWrapper}>
          <Skeleton
            className={classes.userStatsSkeleton}
            variant='rectangular'
          />
          <Skeleton
            className={classes.userStatsSkeleton}
            variant='rectangular'
          />
        </div>
        <Skeleton className={classes.textareaSkeleton} variant='rectangular' />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
