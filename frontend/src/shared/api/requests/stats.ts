import { api } from '@/shared/api/instance';

// Получить общую статистику модератора
export const getSummary = ({ period, startDate, endDate }: GetChartParams = {}) =>
  api
    .get<StatsSummary>('stats/summary', {
      searchParams: {
        period,
        startDate,
        endDate
      }
    })
    .json();

// Получить данные графика активности
export const getActivity = ({ period, startDate, endDate }: GetChartParams) =>
  api
    .get<ActivityData[]>('stats/chart/activity', {
      searchParams: {
        period,
        startDate,
        endDate
      }
    })
    .json();

// Получить данные графика решений
export const getDecisions = ({ period, startDate, endDate }: GetChartParams) =>
  api
    .get<DecisionsData>('stats/chart/decisions', {
      searchParams: {
        period,
        startDate,
        endDate
      }
    })
    .json();

// Получить данные графика категорий
export const getCategories = ({ period, startDate, endDate }: GetChartParams) =>
  api
    .get<CategoriesDistribution>('stats/chart/categories', {
      searchParams: {
        period,
        startDate,
        endDate
      }
    })
    .json();
