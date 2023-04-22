import { makeStyles } from '@mui/styles';
import Typography from '../../../../components/Typography';
import RecipeCard from '../RecipeCard';

interface Props {
  // TODO - Change this to the correct type once we have it
  recipeList?: any;
  title: string;
}

const useStyles = makeStyles((theme: any) => ({
  title: {
    color: theme.palette.text.primary,
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 24,
    marginTop: 80,
  },
  recipeContainer: {
    display: 'grid',
    // alignItems: 'center',
		gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 48,
    // height: 410,
  },
}));

const RecipeSection = ({ recipeList, title }: Props) => {
  const classes = useStyles();

  return (
    <section>
      <Typography className={classes.title}>{title}</Typography>
      <div className={classes.recipeContainer}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
				<RecipeCard />
      </div>
    </section>
  );
};

export default RecipeSection;
