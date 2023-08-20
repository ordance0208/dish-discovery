import { isEmpty } from 'lodash';
import clsx from 'clsx';
import { Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../hooks/profile/useProfile';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { PATHS } from '../../routes';
import AsideCard from '../../components/AsideCard';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import RecipeSkeleton from '../Recipes/RecipesSkeleton';
import ProfileSkeleton from './ProfileSkeleton';
import defaultAvatar from '../../assets/img/default-avatar.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    marginTop: 64,
    margin: 'auto',
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
  },
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
  profileImage: {
    height: 300,
    width: 300,
    objectFit: 'cover',
  },
  userInfo: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  userInfoHeader: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  userName: {
    fontSize: 24,
    lineHeight: '24px',
  },
  userStats: {
    fontWeight: 600,
  },
  userStatsWrapper: {
    display: 'flex',
    gap: 24,
    marginTop: 8,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  textarea: {
    marginTop: 16,
    width: 470,
    height: 'calc(100% - 88px)',
    resize: 'none',
    fontSize: 16,
    fontFamily: 'sans-serif',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 200,
    },
  },
  textareaNoButton: {
    height: 'calc(100% - 72px)',
    [theme.breakpoints.down('md')]: {
      height: 200,
    },
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 24,
    marginTop: 40,
  },
}));

const Profile = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const { profile, loading } = useProfile();

  useDocumentTitle(`${profile?.firstName} ${profile?.lastName}`);

  return (
    <div className={classes.root}>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className={classes.profileSection}>
          <img
            className={classes.profileImage}
            src={profile?.avatar || defaultAvatar}
            alt='profile'
          />
          <div className={classes.userInfo}>
            <div className={classes.userInfoHeader}>
              <Typography className={classes.userName}>
                {profile?.firstName} {profile?.lastName}
              </Typography>
              {profile.isSelf && (
                <Button onClick={() => navigate(PATHS.PROFILE_SETTINGS)}>
                  Edit profile
                </Button>
              )}
            </div>
            <div className={classes.userStatsWrapper}>
              <Typography className={classes.userStats}>
                {profile.posts} Posts
              </Typography>
              <Typography className={classes.userStats}>
                {profile.views} Views
              </Typography>
            </div>
            <textarea
              placeholder='No bio provided'
              value={profile.bio}
              className={clsx(classes.textarea, {
                [classes.textareaNoButton]: !profile.isSelf,
              })}
              maxLength={320}
              spellCheck={false}
              disabled
            ></textarea>
          </div>
        </div>
      )}
      <Divider orientation='horizontal' />
      <div className={classes.cardsGrid}>
        {!isEmpty(profile?.userRecipes) ? (
          profile?.userRecipes.map((recipe: any) => {
            return <AsideCard key={recipe.id} recipe={recipe} />;
          })
        ) : !loading ? (
          <Typography>No posts yet</Typography>
        ) : (
          <RecipeSkeleton />
        )}
      </div>
    </div>
  );
};

export default Profile;
