import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useRecipeFilters from '../../../hooks/recipe/useRecipeFilters';
import { UilTimes, UilSearch } from '@iconscout/react-unicons';
import { SelectChangeEvent, InputAdornment } from '@mui/material';
import TextField from '../../../components/TextField/TextField';
import IconButton from '../../../components/IconButton';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

const useStyles = makeStyles((theme: Theme) => ({
  filtersWrapper: {
    padding: 24,
    border: '1px solid #DEDEDE',
    borderRadius: 4,
    display: 'flex',
    gap: 24,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  searchWrapper: {
    flex: 2,
    height: 50,
    display: 'flex',
  },
  textField: {
    width: 'calc(100% - 64px)',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
  select: {
    flex: 1,
  },
  searchButton: {
    '&.MuiButton-root': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

const RecipeFilters = () => {
  const classes = useStyles();

  const { sortOptions, search, sortBy, setSearch, setSortBy, applyFilters } =
    useRecipeFilters();

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.searchWrapper}>
        <TextField          
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                {search.trim() !== '' && (
                  <IconButton
                    onClick={() => {
                      setSearch('');
                      applyFilters(true);
                    }}
                  >
                    <UilTimes />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          placeholder='Search for recipes'
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
              applyFilters();
            }
          }}
        />
        <Button className={classes.searchButton} onClick={() => applyFilters()}>
          <UilSearch />
        </Button>
      </div>
      <Select
        value={sortBy}
        className={classes.select}
        options={sortOptions}
        onChange={(e: SelectChangeEvent<any>) => {
          setSortBy(e.target.value);
        }}
      />
    </div>
  );
};

export default RecipeFilters;
