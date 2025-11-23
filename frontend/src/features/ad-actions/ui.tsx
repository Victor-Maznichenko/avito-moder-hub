import { Button, SimpleGrid } from '@mantine/core';
import { useUnit } from 'effector-react';

import { AdStatus, AdStatusColors } from '@/shared/lib';

import { model } from './model';

export const AdActions = () => {
  const [aproved, rejected, requestChanges] = useUnit([
    model.aproved,
    model.rejected,
    model.requestChanges
  ]);

  return (
    <>
      <SimpleGrid cols={3}>
        <Button variant='light' color={AdStatusColors[AdStatus.Approved]} onClick={aproved}>
          Одобрить
        </Button>
        <Button variant='light' color={AdStatusColors[AdStatus.Rejected]} onClick={rejected}>
          Отклонить
        </Button>
        <Button
          variant='light'
          color={AdStatusColors[AdStatus.RequestChanges]}
          onClick={requestChanges}
        >
          Доработка
        </Button>
      </SimpleGrid>
    </>
  );
};
