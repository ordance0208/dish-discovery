import { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecipeData } from '../../utils/RecipeContext/selectors';
import { useRecipeActions } from '../../utils/RecipeContext/actions';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import AsideCard from '../../components/AsideCard';
import RecipesSkeleton from './RecipesSkeleton';
import RecipeFilters from './RecipeFilters';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    marginTop: 32,
    marginBottom: 32,
    margin: 'auto',
    [theme.breakpoints.down('xl')]: {
      maxWidth: '90%',
      width: '90%',
    },
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 24,
    marginTop: 24,
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, minmax(350px, 1fr))',
    },
  },
  marginFix: {
    marginTop: 24,
  },
}));

const Recipes = () => {
  const classes = useStyles();

  useDocumentTitle('Recipes');

  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);

  const { fetchAllRecipes, resetAllRecipes } = useRecipeActions();
  const { recipes, loading } = useRecipeData();

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchAllRecipes(
        (parsedQuery?.search as string)?.trim(),
        parsedQuery?.sortBy as string
      );
    };

    if (!loading) {
      fetchRecipes();
    }

    return () => {
      resetAllRecipes();
    };
    // eslint-disable-next-line
  }, [parsedQuery?.search, parsedQuery?.sortBy]);

  return (
    <div className={classes.root}>
      <RecipeFilters />
      {loading || !recipes ? (
        <>
          <div className={classes.marginFix}></div>
          <RecipesSkeleton />
        </>
      ) : (
        <div className={classes.cardGrid}>
          {recipes.map((recipe: any) => {
            return <AsideCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Recipes;
