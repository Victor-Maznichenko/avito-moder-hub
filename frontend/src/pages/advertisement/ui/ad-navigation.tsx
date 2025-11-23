import { Button, Group } from '@mantine/core';
import { generatePath, Link, useParams } from 'react-router';

import { ROUTES } from '@/shared/lib';

export const AdNavigation = () => {
  const { id } = useParams();
  const currentId = Number(id);
  const prevId = currentId - 1;
  const nextId = currentId + 1;

  return (
    <nav>
      <Button mb='md' size='xs' color='gray' component={Link} to={ROUTES.HOME}>
        Назад к списку
      </Button>
      <Group>
        <Button
          disabled={prevId <= 0}
          size='xs'
          color='gray'
          component={Link}
          to={generatePath(ROUTES.ADVERTISEMENT, { id: prevId })}
        >
          Предыдущее объявление
        </Button>
        <Button
          size='xs'
          color='gray'
          component={Link}
          to={generatePath(ROUTES.ADVERTISEMENT, { id: nextId })}
        >
          Следующее объявление
        </Button>
      </Group>
    </nav>
  );
};
