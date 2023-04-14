import Typography from '../../components/Typography';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  text: {
    color: theme.palette.text.primary,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.text}>Test</Typography>
    </div>
  );
};

export default Home;
