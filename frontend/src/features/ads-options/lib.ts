import { AdStatus, SortBy, SortOrder } from '@/shared/lib';

export interface FormValues {
  maxPrice: Nullable<number>;
  minPrice: Nullable<number>;
  sortBy: Nullable<string>;
  sortOrder: Nullable<string>;
  status: string[];
}

export const MAX_PRICE = 100_000_000;
export const MIN_PRICE = 0;

export const sortByData = [
  { value: SortBy.CreatedAt, label: 'По дате создания' },
  { value: SortBy.Price, label: 'По цене' },
  { value: SortBy.Priority, label: 'По приоритету' }
];

export const sortOrderData = [
  { value: SortOrder.Desc, label: 'По убыванию' },
  { value: SortOrder.Asc, label: 'По возрастанию' }
];

export const statusesData = [
  { value: AdStatus.Draft, label: 'Черновик' },
  { value: AdStatus.Pending, label: 'В ожидании' },
  { value: AdStatus.Approved, label: 'Принят' },
  { value: AdStatus.Rejected, label: 'Отклонен' }
];
