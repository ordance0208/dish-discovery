import IconButton from '../../components/IconButton';
import Typography from '../../components/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles } from '@mui/styles';
import { TEXT_DARK } from '../../theme';
import { Theme } from '@mui/material';
import { useState } from 'react';
import useLikeRecipe from '../../hooks/recipe/useLikeRecipe';

interface Props {
  postId: string;
  initialValue: boolean;
  likes: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  likes: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  likeButton: {
    marginLeft: 'auto',
  },
}));

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
