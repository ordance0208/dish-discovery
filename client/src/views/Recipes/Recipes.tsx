import { useEffect, useState } from 'react';
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
import Button from '../../components/Button';
import Typography from '../../components/Typography';

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
  loadMoreButton: {
    display: 'block',
    margin: 'auto',
    marginTop: 64,
  },
}));

const Recipes = () => {
  const classes = useStyles();

  useDocumentTitle('Recipes');

  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);

  const [page, setPage] = useState<number>(1);

  const { fetchAllRecipes, resetAllRecipes } = useRecipeActions();
  const { recipes, loading, hasMore } = useRecipeData();

  const handleLoadMoreRecipes = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchAllRecipes(
        (parsedQuery?.search as string)?.trim(),
        parsedQuery?.sortBy as string,
        page.toString()
      );
    };

    if (!loading) {
      fetchRecipes();
    }
    // eslint-disable-next-line
  }, [parsedQuery?.search, parsedQuery?.sortBy, page]);

  useEffect(() => {
    return () => {
      resetAllRecipes();
    };
  }, []);

  return (
    <div className={classes.root}>
      <RecipeFilters setPage={setPage} />
      {(loading && page === 1) || !recipes ? (
        <>
          <div className={classes.marginFix}></div>
          <RecipesSkeleton />
        </>
      ) : (
        <div className={classes.cardGrid}>
          {recipes.length !== 0 ? (
            recipes.map((recipe: any) => (
              <AsideCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <Typography>No results...</Typography>
          )}
        </div>
      )}
      {loading && page > 1 && (
        <>
          <div className={classes.marginFix}></div>
          <RecipesSkeleton />
        </>
      )}
      {hasMore && (
        <Button
          onClick={handleLoadMoreRecipes}
          className={classes.loadMoreButton}
        >
          Load more...
        </Button>
      )}
    </div>
  );
};

export default Recipes;
