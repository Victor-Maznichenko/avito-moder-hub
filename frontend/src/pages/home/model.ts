import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { spread } from 'patronum';

import { adsOptionsModel } from '@/features/ads-options';
import { requests } from '@/shared/api';
import { filterOptions } from '@/shared/lib';

const PageGate = createGate();

/* Pagination logic */
const $page = createStore(1);
const pageChanged = createEvent<number>();

sample({
  clock: pageChanged,
  target: $page
});

$page.reset(adsOptionsModel.$categoryId, adsOptionsModel.$debouncedSearch);

/* Get adds logic */
const getAdsFx = createEffect(requests.getAds);
const $ads = createStore<Advertisement[]>([]);
const $totalPages = createStore(0);

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
  clock: [PageGate.open, adsOptionsModel.form.formValidated, $unFormedOptions],
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
  PageGate,
  $isLoading: getAdsFx.pending,
  $ads,
  $page,
  $totalPages,
  pageChanged
};
