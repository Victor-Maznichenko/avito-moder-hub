import { createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';
import { reset, spread } from 'patronum';

import { Reason } from '@/shared/lib';

const $id = createStore<Nullable<number>>(null);
const $type = createStore<string>('');
const $title = createStore<string>('');
const $color = createStore<string>('blue');

interface SetOpenedProps {
  color: string;
  id: number;
  title: string;
}

const $isOpened = createStore(false);
const setOpened = createEvent<SetOpenedProps>();
const setClosed = createEvent();

$isOpened.on(setOpened, () => true);
$isOpened.on(setClosed, () => false);

sample({
  clock: setOpened,
  target: spread({ id: $id, title: $title, color: $color, type: $type })
});

reset({
  clock: setClosed,
  target: [$id, $title, $color]
});

/* Form */
const form = createForm({
  fields: {
    [Reason.ForbiddenProduct]: { init: false },
    [Reason.WrongCategory]: { init: false },
    [Reason.BadDescription]: { init: false },
    [Reason.FraudSuspicion]: { init: false },
    [Reason.PhotoIssues]: { init: false },
    [Reason.Other]: { init: '' }
  },
  validateOn: ['submit']
});

sample({
  clock: form.submit,
  target: setClosed
});

export const model = { $title, $color, $type, $isOpened, setOpened, setClosed, form };
