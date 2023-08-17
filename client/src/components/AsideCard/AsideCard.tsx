import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Divider, Theme } from '@mui/material';
import { TEXT_DARK } from '../../theme';
import { makeStyles } from '@mui/styles';
import { PATHS } from '../../routes';
import { UilCalender, UilClock } from '@iconscout/react-unicons';
import Typography from '../Typography';
import IRecipeCard from '../../models/recipe/recipeCard';

interface Props {
  recipe: IRecipeCard;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: 16,
    borderRadius: 4,
    background: '#FAFAFA',
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imageWrapper: {
    height: 200,
    position: 'relative',
  },
  recipeTitleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#33333380',
    padding: 4,
  },
  cardImage: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
  user: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  cardDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    '& p': {
      color: TEXT_DARK,
      fontSize: 12,
    },
  },
  cardAvatar: {
    height: 24,
    width: 24,
    borderRadius: '50%',
  },
  cardTitle: {
    textAlign: 'center',
    color: '#EDEDED',
    fontWeight: 600,
  },
}));

const AsideCard = ({ recipe }: Props) => {
  const navigate = useNavigate();

  const { title, user, createdAt, preparationTime, image, _id } = recipe;
  const classes = useStyles();

  return (
    <div
      className={classes.card}
      onClick={() => navigate(`${PATHS.SPECIFIC_RECIPE}/${_id}`)}
    >
      <div className={classes.imageWrapper}>
        <img className={classes.cardImage} src={image} alt='latest recipes' />
        <div className={classes.recipeTitleWrapper}>
          <Typography className={classes.cardTitle}>{title}</Typography>
        </div>
      </div>
      <div className={classes.cardDetails}>
        <div className={classes.user}>
          <img
            className={classes.cardAvatar}
            src={user.avatar ? user.avatar : undefined}
            alt='user'
          />
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        </div>
        <Divider flexItem orientation='vertical' />
        <UilCalender size={16} color={TEXT_DARK} />
        <Typography>{moment(createdAt).format('DD/MM/YYYY')}</Typography>
        <Divider flexItem orientation='vertical' />
        <UilClock size={16} color={TEXT_DARK} />
        <Typography>{preparationTime} minutes</Typography>
      </div>
    </div>
  );
};

export default AsideCard;
