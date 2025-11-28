import { createEffect, createStore, sample, split } from 'effector';
import { createGate } from 'effector-react';
import { reset } from 'patronum';

import type { ReasonValues } from '@/shared/lib';

import { adActionsModel } from '@/features';
import { requests } from '@/shared/api';
import { AdStatus, ReasonLabels } from '@/shared/lib';
import { adModalModel } from '@/widgets/ad-modal';

const Gate = createGate<number>();

const getAdFx = createEffect(requests.getAd);
const adAproveFx = createEffect(requests.postAdApprove);
const adRejectFx = createEffect(requests.postAdReject);
const adRequestChangesFx = createEffect(requests.postAdRequestChanges);

const $ad = createStore<Nullable<Advertisement>>(null);

/* Fetch advertisement */
sample({
  clock: [Gate.open, Gate.state],
  filter: Boolean,
  fn: (options) => ({ id: options }),
  target: getAdFx
});

sample({
  clock: getAdFx.doneData,
  target: $ad
});

/* Processing actions */
sample({
  clock: adActionsModel.rejected,
  fn: (id) => ({
    id,
    color: 'red',
    title: 'Причина отклонения:',
    type: AdStatus.Rejected
  }),
  target: adModalModel.setOpened
});

sample({
  clock: adActionsModel.requestChanges,
  fn: (id) => ({
    id,
    color: 'yellow',
    title: 'Причина доработок:',
    type: AdStatus.RequestChanges
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

/* Processing modal form */
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

const submittedWithType = sample({
  clock: formSubmitted,
  source: adModalModel.$type,
  fn: (type, data) => ({ type, data })
});

const { rejected, requestChanges } = split(submittedWithType, {
  [AdStatus.Rejected]: ({ type }) => type === AdStatus.Rejected,
  [AdStatus.RequestChanges]: ({ type }) => type === AdStatus.RequestChanges
});

sample({
  clock: rejected,
  fn: ({ data }) => data,
  target: adRejectFx
});

sample({
  clock: requestChanges,
  fn: ({ data }) => data,
  target: adRequestChangesFx
});

sample({
  clock: [adAproveFx.done, adRejectFx.done, adRequestChangesFx.done],
  source: $ad,
  filter: Boolean,
  fn: ({ id }) => ({ id }),
  target: getAdFx
});

/* Resseted values */
sample({
  clock: [adAproveFx.finally, adRejectFx.finally, adRequestChangesFx.finally, Gate.close],
  target: adModalModel.resetted
});

reset({
  clock: Gate.close,
  target: $ad
});

export const model = { Gate, $ad };
