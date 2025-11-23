import { Skeleton } from '@mantine/core';

import { DEFAULT_LIMIT } from './lib';

export const AdsSleleton = () => (
  <>
    {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
      <Skeleton key={i} height={278} radius='md' />
    ))}
  </>
);
