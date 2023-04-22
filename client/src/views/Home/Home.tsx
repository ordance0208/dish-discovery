import { makeStyles } from '@mui/styles';
import RecipeSection from './components/RecipeSections';

const useStyles = makeStyles((theme: any) => ({
  home: {
    maxWidth: 1440,
    [theme.breakpoints.down('xl')]: {
      width: '90%',
    },
    margin: '0 auto',
    paddingTop: 0,    
    // background: theme.palette.background.default
  },
}));

const Home = () => {
  const classes = useStyles();

  return <div className={classes.home}>
    <RecipeSection title='Featured Recipes'/>
    <RecipeSection title='Most Liked Recipes'/>
    <RecipeSection title='Newest Recipes'/>
  </div>;
};

export default Home;
