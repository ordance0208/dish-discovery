import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import useLikeRecipe from '../../hooks/recipe/useLikeRecipe';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '../../components/IconButton';
import Typography from '../../components/Typography';

interface Props {
  postId: string;
  initialValue: boolean;
  likes: number;
}

const useStyles = makeStyles({
  likes: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
});

const LikeButton = ({ initialValue, postId, likes }: Props) => {
  const classes = useStyles();

  const [liked, setLiked] = useState<boolean>(initialValue);
  const { handleRecipeLike } = useLikeRecipe(setLiked, postId, liked);

  return (
    <div className={classes.likes}>
      <Typography>
        {!initialValue && liked
          ? likes + 1
          : initialValue && !liked
          ? likes - 1
          : likes}{' '}
        likes
      </Typography>
      <IconButton onClick={handleRecipeLike}>
        {!liked ? <FavoriteBorderIcon /> : <FavoriteIcon color='warning' />}
      </IconButton>
    </div>
  );
};

export default LikeButton;
