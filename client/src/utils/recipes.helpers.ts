import { SortOptions } from '../models/recipesSort';

export const sortOptions = [
  {
    label: 'Date Descending',
    value: SortOptions.DATE_DESCENDING,
  },
  {
    label: 'Date Ascending',
    value: SortOptions.DATE_ASCENDING,
  },
  {
    label: 'Most Viewed Descending',
    value: SortOptions.VIEWS_DESCENDING,
  },
  {
    label: 'Most Viewed Ascending',
    value: SortOptions.VIEWS_ASCENDING,
  },
  {
    label: 'Preparation Time Ascending',
    value: SortOptions.PREPARATION_TIME_ASCENDING,
  },
  {
    label: 'Preparation Time Descending',
    value: SortOptions.PREPARATION_TIME_DESCENDING,
  },
];
