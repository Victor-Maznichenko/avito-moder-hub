import { Button, SimpleGrid } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router';

import { AdStatus, AdStatusColors } from '@/shared/lib';

import { model } from './model';

export const AdActions = () => {
  const { id } = useParams();
  useGate(model.Gate, Number(id));
  const [aproved, rejected, requestChanges] = useUnit([
    model.aproved,
    model.rejected,
    model.requestChanges
  ]);

  if (!id) {
    return null;
  }

  return (
    <>
      <SimpleGrid cols={3}>
        <Button
          variant='light'
          color={AdStatusColors[AdStatus.Approved]}
          onClick={() => aproved(Number(id))}
        >
          Одобрить
        </Button>
        <Button
          variant='light'
          color={AdStatusColors[AdStatus.Rejected]}
          onClick={() => rejected(Number(id))}
        >
          Отклонить
        </Button>
        <Button
          variant='light'
          color={AdStatusColors[AdStatus.RequestChanges]}
          onClick={() => requestChanges(Number(id))}
        >
          Доработка
        </Button>
      </SimpleGrid>
    </>
  );
};
