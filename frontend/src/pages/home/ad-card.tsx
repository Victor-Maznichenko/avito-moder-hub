import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  NumberFormatter,
  Stack,
  Text
} from '@mantine/core';
import dayjs from 'dayjs';
import { generatePath, Link } from 'react-router';

import FallbackSrc from '@/shared/assets/images/image-fallback.svg';
import { getRandomColor, ROUTES } from '@/shared/lib';

type AdCardProps = Pick<
  Advertisement,
  'category' | 'createdAt' | 'description' | 'id' | 'price' | 'title'
>;

export const AdCard = ({ id, title, description, createdAt, price, category }: AdCardProps) => (
  <Card padding='lg' radius='md' shadow='sm' withBorder>
    <Flex gap='md' pos='relative'>
      <Image fallbackSrc={FallbackSrc} h={236} radius='md' src={null} w={236} />
      <Stack justify='space-between'>
        <div>
          <Text fw={600} mb='sm' mt='md' size='lg'>
            {title}
          </Text>

          <Group mb='xs'>
            <Text fw={700} size='sm'>
              Цена: <NumberFormatter suffix=' ₽' value={price} thousandSeparator=' ' />
            </Text>

            {/* Нет смысла присваивать каждой категории цвет, т.к. на бэкенде id создаются случайным образом через Math.random() */}
            {/* Добавил для разнообразия */}
            <Badge variant='light' color={getRandomColor()}>
              {category}
            </Badge>
          </Group>

          <Text c='dimmed' mb='md' right={0} size='xs' pos='absolute' top={0}>
            Добавлено: {dayjs(createdAt).format('DD.MM.YYYY')}
          </Text>
          <Text c='dimmed' mb='md' size='sm'>
            {description}
          </Text>
        </div>

        <Flex justify='end'>
          <Button
            size='sm'
            variant='outline'
            component={Link}
            to={generatePath(ROUTES.ADVERTISEMENT, { id })}
          >
            Подробнее
          </Button>
        </Flex>
      </Stack>
    </Flex>
  </Card>
);
