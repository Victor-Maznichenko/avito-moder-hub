import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const Gate = createGate<number>();

const $id = createStore<Nullable<number>>(null);

const aproved = createEvent<number>();
const rejected = createEvent<number>();
const requestChanges = createEvent<number>();

sample({
  clock: [Gate.open, Gate.state],
  target: $id
});

export const model = { Gate, aproved, rejected, requestChanges };
