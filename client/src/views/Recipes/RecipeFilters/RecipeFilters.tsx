import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useRecipeFilters from '../../../hooks/recipe/useRecipeFilters';
import { UilTimes } from '@iconscout/react-unicons';
import { SelectChangeEvent, InputAdornment } from '@mui/material';
import TextField from '../../../components/TextField/TextField';
import IconButton from '../../../components/IconButton';
import Select from '../../../components/Select';

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
  textField: {
    flex: 2,
  },
  select: {
    flex: 1,
  },
}));

const RecipeFilters = () => {
  const classes = useStyles();

  const { sortOptions, search, sortBy, setSearch, setSortBy, applyFilters } =
    useRecipeFilters();

  return (
    <div className={classes.filtersWrapper}>
      <TextField
        className={classes.textField}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {search && (
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
