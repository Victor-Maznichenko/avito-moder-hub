import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { spread } from 'patronum';

import { adsOptionsModel } from '@/features/ads-options';
import { requests } from '@/shared/api';
import { filterOptions } from '@/shared/lib';

const Gate = createGate();

/* Pagination logic */
const pageChanged = createEvent<number>();
const $totalPages = createStore(1);
const $page = createStore(1);

sample({
  clock: pageChanged,
  target: $page
});

$page.reset(adsOptionsModel.$categoryId, adsOptionsModel.$debouncedSearch);

/* Get adds logic */
const getAdsFx = createEffect(requests.getAds);
const $ads = createStore<Advertisement[]>([]);

const $unFormedOptions = combine({
  page: $page,
  categoryId: adsOptionsModel.$categoryId,
  search: adsOptionsModel.$debouncedSearch
});

const $requestOptions = combine(
  $unFormedOptions,
  adsOptionsModel.form.$values,
  (options1, options2) => ({
    ...options1,
    ...options2
  })
);

sample({
  clock: [Gate.open, adsOptionsModel.form.formValidated, $unFormedOptions],
  source: $requestOptions,
  fn: (options) => filterOptions(options) as GetAdsParams,
  target: getAdsFx
});

sample({
  clock: getAdsFx.doneData,
  fn: ({ ads, pagination }) => ({
    ads,
    totalPages: pagination.totalPages
  }),
  target: spread({
    ads: $ads,
    totalPages: $totalPages
  })
});

export const model = {
  Gate,
  $isLoading: getAdsFx.pending,
  $ads,
  $page,
  $totalPages,
  pageChanged
};
