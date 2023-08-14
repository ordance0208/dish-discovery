import { useEffect } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRecipeData } from '../../utils/RecipeContext/selectors';
import { useRecipeActions } from '../../utils/RecipeContext/actions';
import Typography from '../../components/Typography';
import AsideCard from '../../components/AsideCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    marginTop: 64,
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
  },
}));

const Recipes = () => {
  const classes = useStyles();
  const { fetchAllRecipes } = useRecipeActions();
  const { recipes, loading } = useRecipeData();

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetchAllRecipes();
    };

    fetchRecipes();
  }, []);

  return (
    <div className={classes.root}>
      {loading || !recipes ? (
        <Typography>Loading...</Typography>
      ) : (
        <div className={classes.cardGrid}>
          {recipes.map((recipe: any) => {
            return <AsideCard post={recipe} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Recipes;
