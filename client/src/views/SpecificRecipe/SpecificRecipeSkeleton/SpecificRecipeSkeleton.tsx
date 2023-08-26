import { Divider, Theme } from '@mui/material';
import { TEXT_DARK } from '../../../theme';
import { makeStyles } from '@mui/styles';
import { UilCalender, UilClock, UilEye } from '@iconscout/react-unicons';
import Skeleton from '@mui/material/Skeleton';
import Typography from '../../../components/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    marginTop: 32,
    marginBottom: 32,
    margin: 'auto',
    display: 'flex',
    [theme.breakpoints.down('xl')]: {
      maxWidth: '90%',
      width: '90%',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  recipeSection: {
    flex: 2.5,
    [theme.breakpoints.down('xl')]: {
      flex: 1.9,
    },
  },
  recipeTitle: {
    height: 48,
    width: 350,
    borderRadius: 4,
    marginBottom: 16,
  },
  recipeImage: {
    width: 850,
    [theme.breakpoints.down('xl')]: {
      width: 700,
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    height: 600,
    borderRadius: 4,
  },
  recipeDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    width: 850,
    borderBottom: '1px solid lightgray',
    paddingBottom: 12,
    [theme.breakpoints.down('xl')]: {
      width: 700,
    },
  },
  authorAvatar: {
    height: 32,
    width: 32,
  },
  stat: {
    height: 24,
    width: 94,
    borderRadius: 4,
  },
  recipeInfoSection: {
    marginTop: 24,
    width: 850,
    [theme.breakpoints.down('xl')]: {
      width: 700,
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  recipeInfoSectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    color: TEXT_DARK,
  },
  aside: {
    flex: 1,
  },
  asideTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 32,
    color: TEXT_DARK,
  },
  latestPostsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  latestPostSkeleton: {
    height: 268,
    borderRadius: 4,
  },
}));

const SpecificRecipeSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.recipeSection}>
        <Skeleton className={classes.recipeTitle} variant='rectangular' />
        <Skeleton className={classes.recipeImage} variant='rectangular' />
        <div className={classes.recipeDetail}>
          <Skeleton variant='circular' className={classes.authorAvatar} />
          <Skeleton variant='rectangular' className={classes.stat} />
          <Divider flexItem orientation='vertical' />
          <UilCalender color={TEXT_DARK} />
          <Skeleton variant='rectangular' className={classes.stat} />
          <Divider flexItem orientation='vertical' />
          <UilClock color={TEXT_DARK} />
          <Skeleton variant='rectangular' className={classes.stat} />
          <Divider flexItem orientation='vertical' />
          <UilEye color={TEXT_DARK} />
          <Skeleton variant='rectangular' className={classes.stat} />
        </div>
        <div className={classes.recipeInfoSection}>
          <Typography className={classes.recipeInfoSectionTitle}>
            Description
          </Typography>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </div>
      </div>
      <div className={classes.aside}>
        <Typography className={classes.asideTitle}>Latest Posts</Typography>
        <div className={classes.latestPostsWrapper}>
          <Skeleton
            className={classes.latestPostSkeleton}
            variant='rectangular'
          />
          <Skeleton
            className={classes.latestPostSkeleton}
            variant='rectangular'
          />
          <Skeleton
            className={classes.latestPostSkeleton}
            variant='rectangular'
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificRecipeSkeleton;
