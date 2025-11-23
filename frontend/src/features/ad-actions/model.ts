import { createEvent } from 'effector';

const aproved = createEvent();
const rejected = createEvent();
const requestChanges = createEvent();

export const model = { aproved, rejected, requestChanges };
