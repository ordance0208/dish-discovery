import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles((theme: Theme) => ({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 24,
  },
  skeletonWrapper: {
    height: 268,
    maxHeight: 268,
  },
  skeletonRecipe: {
    width: '100%',
    height: 268,
    borderRadius: 4,
  },
}));

const RecipeSkeleton = () => {
  const classes = useStyles();

  const skeletonElements = Array.from({ length: 9 }).map(
    (el: any, index: number) => (
      <div key={index} className={classes.skeletonWrapper}>
        <Skeleton variant='rectangular' className={classes.skeletonRecipe} />
      </div>
    )
  );

  return <div className={classes.cardGrid}>{skeletonElements}</div>;
};

export default RecipeSkeleton;
