import { Card, Group, Rating, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';

type AdSellerProps = Required<Pick<Advertisement, 'seller'>>;

export const AdSeller = ({ seller }: AdSellerProps) => (
  <Card p='lg' radius='md' withBorder>
    <Stack gap='sm'>
      <Title order={3}>{seller.name}</Title>

      <Group align='center' gap={6}>
        <Text c='dimmed' size='sm'>
          Рейтинг
        </Text>
        <Rating readOnly size='sm' value={Number(seller.rating)} fractions={4} />
        <Text fw={500} size='xs'>
          {seller.rating}
        </Text>
      </Group>

      <Group justify='space-between'>
        <Text c='dimmed' size='sm'>
          Количество объявлений
        </Text>
        <Text fw={500} size='sm'>
          {seller.totalAds}
        </Text>
      </Group>

      <Group justify='space-between'>
        <Text c='dimmed' size='sm'>
          Дата регистрации
        </Text>
        <Text fw={500} size='sm'>
          {dayjs(seller.registeredAt).format('DD.MM.YYYY')}
        </Text>
      </Group>
    </Stack>
  </Card>
);
