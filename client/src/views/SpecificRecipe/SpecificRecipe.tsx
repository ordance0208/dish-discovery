import { useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { TEXT_DARK } from '../../theme';
import { makeStyles } from '@mui/styles';
import { useRecipeData } from '../../utils/RecipeContext/selectors';
import { useRecipeActions } from '../../utils/RecipeContext/actions';
import { useAuthData } from '../../utils/AuthContext/selectors';
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    margin: 'auto',
    display: 'flex',
    marginBottom: 32,
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
    marginTop: 32,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 32,
    color: TEXT_DARK,
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
  user: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  userAvatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
  recipeDescriptionWrapper: {
    marginTop: 24,
    width: 850,
    [theme.breakpoints.down('xl')]: {
      width: 700,
    },
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    color: TEXT_DARK,
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
  asideSection: {
    marginBottom: 16,
  },
  asideSectionTitle: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 32,
    color: TEXT_DARK,
  },
  latestSection: {
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
    <div className={classes.root}>
      {singleRecipe === null ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <div className={classes.recipeSection}>
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
              <div className={classes.user}>
                <img
                  className={classes.userAvatar}
                  src={singleRecipe?.user.avatar || defaultAvatar}
                  alt='user'
                />
                <Typography>{`${singleRecipe?.user.firstName} ${singleRecipe?.user.lastName}`}</Typography>
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
            <div className={classes.recipeDescriptionWrapper}>
              <Typography className={classes.sectionTitle}>
                Description
              </Typography>
              <ReadOnlyEditor editorValue={singleRecipe.description} />
            </div>
            <div className={classes.recipeDescriptionWrapper}>
              <Typography className={classes.sectionTitle}>
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
            <div className={classes.recipeDescriptionWrapper}>
              <Typography className={classes.sectionTitle}>Tags</Typography>
              <div className={classes.tagsWrapper}>
                {singleRecipe?.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
          <aside className={classes.aside}>
            <div className={classes.asideSection}>
              <Typography className={classes.asideSectionTitle}>
                Latest Posts
              </Typography>
              <div className={classes.latestSection}>
                {latestRecipes.map((post: any, index: number) => {
                  return <AsideCard key={index} recipe={post} />;
                })}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default SpecificRecipe;
