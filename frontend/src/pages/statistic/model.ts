import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';
import { not } from 'patronum';

import { requests } from '@/shared/api';
import { filterOptions, Period } from '@/shared/lib';

const initialSummary = {
  totalReviewed: 0,
  totalReviewedToday: 0,
  totalReviewedThisWeek: 0,
  totalReviewedThisMonth: 0,
  approvedPercentage: 0,
  rejectedPercentage: 0,
  requestChangesPercentage: 0,
  averageReviewTime: 0
};

const Gate = createGate();

// Change period logic
const periodChanged = createEvent<string>();
const $period = createStore('week');
const $isCustomPeriod = $period.map((state) => state === Period.Custom);
$period.on(periodChanged, (_, newPeriod) => newPeriod);

// Other
const getSummaryFx = createEffect(requests.getSummary);
const getАctivityFx = createEffect(requests.getActivity);
const getDecisionsFx = createEffect(requests.getDecisions);
const getCategoriesFx = createEffect(requests.getCategories);

const $summary = createStore<StatsSummary>(initialSummary);
const $activity = createStore<ActivityData[]>([]);
const $decisions = createStore<Nullable<DecisionsData>>(null);
const $categories = createStore<Nullable<CategoriesDistribution>>(null);

interface FormValues {
  endDate: Nullable<string>;
  startDate: Nullable<string>;
}

const form = createForm<FormValues>({
  fields: {
    startDate: {
      init: null
    },
    endDate: {
      init: null
    }
  }
});

sample({
  clock: [Gate.open, $period],
  source: $period,
  filter: not($isCustomPeriod),
  fn: (period) => ({ period }) as GetChartParams,
  target: [getSummaryFx, getАctivityFx, getDecisionsFx, getCategoriesFx]
});

sample({
  clock: form.$values,
  source: combine($period, form.$values),
  fn: ([period, { startDate, endDate }]) =>
    filterOptions({ period, startDate, endDate }) as GetChartParams,
  target: [getSummaryFx, getАctivityFx, getDecisionsFx, getCategoriesFx]
});

sample({ clock: getSummaryFx.doneData, target: $summary });
sample({ clock: getАctivityFx.doneData, target: $activity });
sample({ clock: getDecisionsFx.doneData, target: $decisions });
sample({ clock: getCategoriesFx.doneData, target: $categories });

export const model = {
  Gate,
  form,
  $period,
  $isCustomPeriod,
  $summary,
  $activity,
  $decisions,
  $categories,
  $isActivityLoading: getАctivityFx.pending,
  $isDecisionsLoading: getDecisionsFx.pending,
  $isCategoriesLoading: getCategoriesFx.pending,
  periodChanged
};
