import { makeStyles } from '@mui/styles';
import hamburger from '../../../../assets/img/hamburger.jpeg';
import Typography from '../../../../components/Typography';
import { UilClock } from '@iconscout/react-unicons';

const useStyles = makeStyles((theme: any) => ({
  root: {
    // width: 250,
    height: '100%',
    boxShadow: '0 0 6px 0 rgba(0, 0, 0, 0.3)',
    // borderRadius: 8,
    '&:hover': {
      cursor: 'pointer',
      '& $image': {
        transform: 'scale(1.05)',
      },
    },
  },
  cardBody: {
    padding: 12,
    // paddingTop: 8,
    background: theme.palette.background.default,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    objectFit: 'cover',
    transition: 'transform 400ms',
    userDrag: 'none',
    WebkitUserDrag: 'none',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.text.primary,
    margin: '8px 0',
  },
  cookingTime: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 6px',
    background: theme.palette.primary.main,
    color: theme.palette.text.primary,
    width: 'auto',
    borderRadius: 4,
  },
  cookingTimeText: {
    fontSize: 12,
  },
}));

const RecipeCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={hamburger} className={classes.image} alt="recipe"/>
      </div>
      <div className={classes.cardBody}>
        <div className={classes.cookingTime}>
          <UilClock size={16} />{' '}
          <Typography className={classes.cookingTimeText}>
            15 minutes
          </Typography>
        </div>
        <Typography className={classes.recipeName}>Cool Hamburger</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          obcaecati?
        </Typography>
      </div>
    </div>
  );
};

export default RecipeCard;
