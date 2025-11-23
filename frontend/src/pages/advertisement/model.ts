import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { reset } from 'patronum';

import type { ReasonValues } from '@/shared/lib';

import { adActionsModel } from '@/features';
import { requests } from '@/shared/api';
import { ReasonLabels } from '@/shared/lib';
import { adModalModel } from '@/widgets/ad-modal';

const PageGate = createGate<string>();

const getAdFx = createEffect(requests.getAd);
const $ad = createStore<Nullable<Advertisement>>(null);

sample({
  clock: [PageGate.open, PageGate.state],
  filter: (id) => typeof id === 'string' && id.length > 0,
  fn: (options) => ({ id: options }),
  target: getAdFx
});

sample({
  clock: getAdFx.doneData,
  target: $ad
});

const adAproveFx = createEffect(requests.postAdApprove);
const adRejectFx = createEffect(requests.postAdReject);
const adRequestChangesFx = createEffect(requests.postAdRequestChanges);

const MODAL_TYPES = {
  Rejected: 'rejected',
  RequestChanges: 'request-changes'
};

sample({
  clock: adActionsModel.rejected,
  source: $ad,
  filter: Boolean,
  fn: ({ id }) => ({
    id,
    color: 'red',
    title: 'Причина отклонения:',
    type: MODAL_TYPES.Rejected
  }),
  target: adModalModel.setOpened
});

sample({
  clock: adActionsModel.requestChanges,
  source: $ad,
  filter: Boolean,
  fn: ({ id }) => ({
    id,
    color: 'yellow',
    title: 'Причина доработок:',
    type: MODAL_TYPES.RequestChanges
  }),
  target: adModalModel.setOpened
});

sample({
  clock: adActionsModel.aproved,
  source: $ad,
  filter: Boolean,
  fn: ({ id }) => ({ id }),
  target: adAproveFx
});

const formSubmitted = sample({
  clock: sample({
    clock: adModalModel.form.submit,
    source: $ad,
    filter: Boolean
  }),
  source: adModalModel.form.$values,
  fn: (values, { id }) => {
    const computedReason = Object.entries(ReasonLabels)
      .flatMap(([reason, label]) => (values[reason as ReasonValues] ? label : []))
      .join('; ');

    return { id, reason: computedReason };
  }
});

sample({
  clock: formSubmitted,
  source: adModalModel.$type,
  filter: (type) => type === MODAL_TYPES.Rejected,
  fn: (_, data) => data,
  target: adRejectFx
});

sample({
  clock: formSubmitted,
  source: adModalModel.$type,
  filter: (type) => type === MODAL_TYPES.RequestChanges,
  fn: (_, data) => data,
  target: adRequestChangesFx
});

sample({
  clock: [adAproveFx.done, adRejectFx.done, adRequestChangesFx.done],
  source: $ad,
  filter: Boolean,
  fn: ({ id }) => ({ id }),
  target: getAdFx
});

reset({
  clock: PageGate.close,
  target: $ad
});

export const model = { PageGate, $ad };
