import type { DatesRangeValue } from '@mantine/dates';
import type { FormEvent } from 'react';

import { BarChart, PieChart, RadarChart } from '@mantine/charts';
import {
  AppShellMain,
  Badge,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { useForm } from 'effector-forms';
import { useGate, useUnit } from 'effector-react';

import {
  AdStatus,
  AdStatusColors,
  AdStatusLabel,
  formatPercent,
  Period,
  PeriodLabel,
  secondsToMinutes
} from '@/shared/lib';

import { model } from './model';

const periods = Object.values(Period).map((value) => ({
  label: PeriodLabel[value],
  value
}));

export const StatsPage = () => {
  useGate(model.PageGate);
  const [
    period,
    activity,
    decisions,
    categories,
    isCustomPeriod,
    { totalReviewed, approvedPercentage, rejectedPercentage, averageReviewTime },
    formSubmit,
    periodChanged
  ] = useUnit([
    model.$period,
    model.$activity,
    model.$decisions,
    model.$categories,
    model.$isCustomPeriod,
    model.$summary,
    model.form.submit,
    model.periodChanged
  ]);
  const { fields } = useForm(model.form);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmit();
  };

  const handleDatePicker = ([startDate, endDate]: DatesRangeValue<string>) => {
    fields.startDate.onChange(startDate);
    fields.endDate.onChange(endDate);
  };

  const activityDataPrepared = activity.map(({ date, ...rest }) => ({
    date: dayjs(date).format('DD.MM'),
    ...rest
  }));

  const activitySeries = Object.values(AdStatus).map((status) => ({
    name: status,
    label: AdStatusLabel[status],
    color: AdStatusColors[status]
  }));

  const decisionsDataPrepared =
    decisions &&
    (Object.keys(decisions) as Array<keyof DecisionsData>).map((status) => ({
      name: AdStatusLabel[status],
      value: Math.round(decisions[status] * 100) / 100,
      color: AdStatusColors[status]
    }));

  const categoriesDataPrepared =
    categories &&
    Object.entries(categories).map(([category, value]) => ({
      category,
      value
    }));

  return (
    <AppShellMain>
      <Container size='lg'>
        <Title mb='md' order={2}>
          Статистика:
        </Title>
        <Paper p='lg' radius='md' shadow='sm'>
          <Stack gap='md'>
            <Paper bg='gray' p={8} radius='md' withBorder>
              <Group justify='space-between'>
                <div>
                  <Text fw={500} mb={2} size='sm'>
                    Период:
                  </Text>
                  <SegmentedControl
                    data={periods}
                    size='sm'
                    value={period}
                    onChange={periodChanged}
                  />
                </div>
                <form onSubmit={handleFormSubmit}>
                  <Group gap='xs'>
                    <DatePickerInput
                      disabled={!isCustomPeriod}
                      label='Дата от'
                      maxDate={new Date()}
                      minDate={dayjs().subtract(1, 'year').toDate()}
                      type='range'
                      value={[fields.startDate.value, fields.endDate.value]}
                      onChange={handleDatePicker}
                      placeholder='Выберите дату'
                      valueFormat='DD.MM.YYYY'
                    />
                  </Group>
                </form>
              </Group>
            </Paper>

            <SimpleGrid cols={4}>
              <Card p='md' radius='md' withBorder>
                <div>
                  <Text c='dimmed' size='sm' component='span'>
                    Проверено:{' '}
                  </Text>
                  <Text component='span'>{totalReviewed}</Text>
                </div>
              </Card>
              <Card p='md' radius='md' withBorder>
                <div>
                  <Text c='dimmed' size='sm' component='span'>
                    Одобрено:{' '}
                  </Text>
                  <Text component='span'>{formatPercent(approvedPercentage)}</Text>
                </div>
              </Card>
              <Card p='md' radius='md' withBorder>
                <div>
                  <Text c='dimmed' size='sm' component='span'>
                    Отклонено:{' '}
                  </Text>
                  <Text component='span'>{formatPercent(rejectedPercentage)}</Text>
                </div>
              </Card>
              <Card p='md' radius='md' withBorder>
                <div>
                  <Text c='dimmed' size='sm' component='span'>
                    Среднее время:{' '}
                  </Text>
                  <Text component='span'>{secondsToMinutes(averageReviewTime)}</Text>
                </div>
              </Card>
            </SimpleGrid>

            <Paper p='md' radius='md' withBorder>
              <Group mb='md'>
                <Text>График активности</Text>
                <Badge variant='outline'>{PeriodLabel[period as ValueOf<typeof Period>]}</Badge>
              </Group>

              <BarChart
                data={activityDataPrepared}
                dataKey='date'
                h={320}
                series={activitySeries}
                type='stacked'
              />
            </Paper>

            <Paper p='md' radius='md' withBorder>
              <Text mb={8}>Распределение решений</Text>
              <Divider my='sm' />
              <Flex justify='center'>
                <PieChart
                  withLabels
                  withLabelsLine
                  data={decisionsDataPrepared ?? []}
                  labelsType='percent'
                  size={300}
                  labelsPosition='outside'
                  withTooltip
                />
              </Flex>
            </Paper>

            <Paper p='md' radius='md' withBorder>
              <Group mb='md'>
                <Text>График активности</Text>
                <Badge variant='outline'>{PeriodLabel[period as ValueOf<typeof Period>]}</Badge>
              </Group>

              <RadarChart
                data={categoriesDataPrepared ?? []}
                dataKey='category'
                h={320}
                series={[{ name: 'value', color: 'indigo.5', opacity: 0.1 }]}
                withDots
                withTooltip
              />
            </Paper>
          </Stack>
        </Paper>
      </Container>
    </AppShellMain>
  );
};
