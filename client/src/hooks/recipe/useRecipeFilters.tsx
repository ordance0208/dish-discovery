import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { sortOptions } from '../../utils/recipes.helpers';
import { SortOptions } from '../../models/recipesSort';

const useRecipeFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const parsedQuery = queryString.parse(location.search);

  const [search, setSearch] = useState<string>(
    (parsedQuery.search as string) || ''
  );
  const [sortBy, setSortBy] = useState<SortOptions>(
    (parsedQuery.sortBy as any) || SortOptions.DATE_DESCENDING
  );

  useEffect(() => {
    applyFilters();
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
