import { createEvent, createStore, restore } from 'effector';
import { createForm } from 'effector-forms';
import { debounce } from 'patronum';

interface FormValues {
  maxPrice: Nullable<number>;
  minPrice: Nullable<number>;
  sortBy: Nullable<string>;
  sortOrder: Nullable<string>;
  status: string[];
}

const form = createForm<FormValues>({
  fields: {
    minPrice: {
      init: null,
      rules: [
        {
          name: 'minLessThanOrEqualMax',
          validator: (minPrice, { maxPrice }: Pick<FormValues, 'maxPrice'>) =>
            !maxPrice || !minPrice || Number(minPrice) <= Number(maxPrice),
          errorText: 'Минимальная цена не должна превышать максимальную.'
        }
      ]
    },
    maxPrice: {
      init: null,
      rules: [
        {
          name: 'maxGreaterThanOrEqualMin',
          validator: (maxPrice, { minPrice }: Pick<FormValues, 'minPrice'>) =>
            !maxPrice || !minPrice || Number(maxPrice) >= Number(minPrice),
          errorText: 'Минимальная цена не должна превышать максимальную.'
        }
      ]
    },
    status: { init: [] },
    sortBy: { init: null },
    sortOrder: {
      init: null,
      rules: [
        {
          name: 'sortByRequired',
          validator: (_, { sortBy }: Pick<FormValues, 'sortBy'>) => Boolean(sortBy),
          errorText: 'Выберите параметр сортировки.'
        }
      ]
    }
  },
  validateOn: ['submit']
});

const searchQueryChanged = createEvent<string>();
const $search = createStore('');
const $debouncedSearch = restore(debounce($search, 300), '');
$search.on(searchQueryChanged, (_, search) => search);

const categoryChanged = createEvent<number>();
const $categoryId = createStore<Nullable<number>>(null);
$categoryId.on(categoryChanged, (_, id) => id);

export const model = {
  form,
  $search,
  $categoryId,
  $debouncedSearch,
  searchQueryChanged,
  categoryChanged
};
