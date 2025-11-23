import type { BoxComponentProps } from '@mantine/core';

import { Badge, Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';

import { Condition } from '@/shared/ui';

interface AdModerationHistoryProps extends BoxComponentProps {
  moderationHistory?: ModerationHistory[];
}

export const AdModerationHistory = ({ moderationHistory, ...props }: AdModerationHistoryProps) => {
  if (moderationHistory && !moderationHistory.length) {
    return null;
  }

  return (
    <Box {...props}>
      <Title mb='sm' order={3}>
        История модерации:
      </Title>

      <Stack gap='md'>
        {moderationHistory?.map(({ moderatorName, timestamp, action, reason, id }) => (
          <Card key={id} p='md' radius='md' withBorder>
            <Stack gap='xs'>
              <Badge variant='light' w='fit-content' color='blue'>
                {action}
              </Badge>

              <Group justify='space-between'>
                <Text c='dimmed' size='sm'>
                  Модератор
                </Text>
                <Text fw={500} size='sm'>
                  {moderatorName}
                </Text>
              </Group>

              <Group justify='space-between'>
                <Text c='dimmed' size='sm'>
                  Время
                </Text>
                <Text fw={500} size='sm'>
                  {dayjs(timestamp).format('DD.MM.YYYY')}
                </Text>
              </Group>

              <Condition
                then={
                  <Group align='flex-start' justify='space-between'>
                    <Text c='dimmed' size='sm'>
                      Причина:
                    </Text>
                    <Text fw={500} maw={280} size='sm'>
                      {reason}
                    </Text>
                  </Group>
                }
                value={reason}
              />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
