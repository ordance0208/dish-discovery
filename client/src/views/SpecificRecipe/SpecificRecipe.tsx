import { useEffect, useState } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TEXT_DARK } from '../../theme';
import { makeStyles } from '@mui/styles';
import { useRecipeData } from '../../utils/RecipeContext/selectors';
import { useRecipeActions } from '../../utils/RecipeContext/actions';
import { useAuthData } from '../../utils/AuthContext/selectors';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { PATHS } from '../../routes';
import {
  UilCalender,
  UilClock,
  UilEye,
  UilPen,
  UilTrashAlt,
} from '@iconscout/react-unicons';
import { Checkbox, Divider, Theme } from '@mui/material';
import Typography from '../../components/Typography';
import Chip from '../../components/Chip';
import AsideCard from '../../components/AsideCard';
import LikeButton from '../../components/LikeButton';
import ReadOnlyEditor from '../../components/ReadOnlyEditor';
import defaultAvatar from '../../assets/img/default-avatar.png';
import IconButton from '../../components/IconButton';
import Dialog from '../../components/Dialog';
import SpecificRecipeSkeleton from './SpecificRecipeSkeleton';

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
  recipeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 32,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 32,
    color: TEXT_DARK,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  recipeActions: {
    display: 'flex',
    gap: 4,
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
    objectFit: 'cover',
  },
  recipeDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    width: 850,
    [theme.breakpoints.down('xl')]: {
      width: 700,
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      '& p': {
        fontSize: 12,
      },
    },
    '& p': {
      color: TEXT_DARK,
    },
    borderBottom: '1px solid lightgray',
    paddingBottom: 12,
  },
  authorWrapper: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  authorAvatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
  authorProfileLink: {
    textDecoration: 'none',
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
  ingredient: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  ingredientText: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tagsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    padding: 12,
    border: '1px solid lightgray',
    borderRadius: 4,
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
}));

const SpecificRecipe = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useAuthData();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const { fetchSingleRecipe, resetRecipe, recipeDelete } = useRecipeActions();
  const { singleRecipe, latestRecipes } = useRecipeData();

  useDocumentTitle(singleRecipe?.title || 'Loading...');

  const { pathname } = useLocation();
  const recipeId = pathname.split('/').pop();

  useEffect(() => {
    const fetchRecipe = async () => {
      await fetchSingleRecipe(recipeId!);
    };

    fetchRecipe();

    return () => {
      resetRecipe();
    };
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      {singleRecipe === null ? (
        <SpecificRecipeSkeleton />
      ) : (
        <div className={classes.root}>
          <article className={classes.recipeSection}>
            <div className={classes.recipeHeader}>
              <Typography className={classes.recipeTitle}>
                {singleRecipe?.title}
              </Typography>
              {user !== null && user?._id === singleRecipe?.user?._id && (
                <div className={classes.recipeActions}>
                  <IconButton
                    onClick={() =>
                      navigate(`${PATHS.EDIT_RECIPE}/${singleRecipe._id}`)
                    }
                  >
                    <UilPen />
                  </IconButton>
                  <IconButton onClick={() => setDeleteDialogOpen(true)}>
                    <UilTrashAlt />
                  </IconButton>
                </div>
              )}
            </div>
            <Dialog
              open={!!deleteDialogOpen}
              title='Delete current recipe'
              onConfirm={() => recipeDelete(singleRecipe?._id)}
              onClose={() => setDeleteDialogOpen(false)}
              confirmButtonColor='warning'
            >
              <Typography>
                Are you sure you want to delete this recipe?
              </Typography>
            </Dialog>
            <img
              className={classes.recipeImage}
              src={singleRecipe?.image}
              alt='recipe'
            />
            <div className={classes.recipeDetails}>
              <div className={classes.authorWrapper}>
                <img
                  className={classes.authorAvatar}
                  src={singleRecipe?.user.avatar || defaultAvatar}
                  alt='user'
                />
                <Link
                  className={classes.authorProfileLink}
                  to={
                    user?._id === singleRecipe?.user?._id
                      ? PATHS.PROFILE_ME
                      : `${PATHS.PROFILE}/${singleRecipe?.user._id}`
                  }
                >
                  <Typography>{`${singleRecipe?.user.firstName} ${singleRecipe?.user.lastName}`}</Typography>
                </Link>
              </div>
              <Divider flexItem orientation='vertical' />
              <UilCalender color={TEXT_DARK} />
              <Typography>
                {moment(singleRecipe.createdAt).format('DD/MM/YYYY')}
              </Typography>
              <Divider flexItem orientation='vertical' />
              <UilClock color={TEXT_DARK} />
              <Typography>{singleRecipe?.preparationTime} minutes</Typography>
              <Divider flexItem orientation='vertical' />
              <UilEye color={TEXT_DARK} />
              <Typography>{singleRecipe?.views}</Typography>
              {user !== null && (
                <LikeButton
                  initialValue={singleRecipe.likes.includes(user._id)}
                  postId={recipeId!}
                  likes={singleRecipe.likes.length}
                />
              )}
            </div>
            <div className={classes.recipeInfoSection}>
              <Typography className={classes.recipeInfoSectionTitle}>
                Description
              </Typography>
              <ReadOnlyEditor editorValue={singleRecipe.description} />
            </div>
            <div className={classes.recipeInfoSection}>
              <Typography className={classes.recipeInfoSectionTitle}>
                Ingredients
              </Typography>
              {singleRecipe?.ingredients.map(
                (ingredient: string, index: number) => (
                  <div
                    key={`ingredient-${index}`}
                    className={classes.ingredient}
                  >
                    <Checkbox id={`ingredient-${index}`} />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={classes.ingredientText}
                    >
                      <Typography>{ingredient}</Typography>
                    </label>
                  </div>
                )
              )}
            </div>
            <div className={classes.recipeInfoSection}>
              <Typography className={classes.recipeInfoSectionTitle}>
                Tags
              </Typography>
              <div className={classes.tagsWrapper}>
                {singleRecipe?.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} />
                ))}
              </div>
            </div>
          </article>
          <aside className={classes.aside}>
            <Typography className={classes.asideTitle}>Latest Posts</Typography>
            <div className={classes.latestPostsWrapper}>
              {!isEmpty(latestRecipes) ? latestRecipes.map((post: any, index: number) => {
                return <AsideCard key={index} recipe={post} />;
              }) : <Typography>No recipes</Typography>}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default SpecificRecipe;
