import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecipeActions from '../../utils/RecipeContext/actions';
import { sortOptions } from '../../utils/recipes.helpers';
import { SortOptions } from '../../models/recipesSort';

const useRecipeFilters = (
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetAllRecipes } = useRecipeActions();

  const parsedQuery = queryString.parse(location.search);

  const [initial, setInitial] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(
    (parsedQuery.search as string) || ''
  );
  const [sortBy, setSortBy] = useState<SortOptions>(
    (parsedQuery.sortBy as any) || SortOptions.DATE_DESCENDING
  );

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
  }, [sortBy]);

  const applyFilters = async (clearSearch?: boolean) => {
    const queryParams = new URLSearchParams();
    if (!clearSearch) {
      if (search.trim() !== '') queryParams.set('search', search.trim());
    }
    if (sortBy !== SortOptions.DATE_DESCENDING) {
      if (sortBy) queryParams.set('sortBy', sortBy);
    }

    navigate(`?${queryParams.toString()}`);
    if (initial) return setInitial(false);
    resetAllRecipes();
    setPage(1);
  };

  return {
    sortOptions,
    search,
    sortBy,
    setSearch,
    setSortBy,
    applyFilters,
  };
};

export default useRecipeFilters;
