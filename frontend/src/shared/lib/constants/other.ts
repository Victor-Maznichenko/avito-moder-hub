export interface BaseAdParams {
  id: number | string;
}
export interface UnsuitableAdParams extends BaseAdParams, PostAdUnsuitableParams {}

export const CATEGORIES = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' }
] as const;

export const AdStatus = {
  Approved: 'approved',
  Draft: 'draft',
  Pending: 'pending',
  Rejected: 'rejected',
  RequestChanges: 'requestChanges'
} as const;

export type AdStatusValue = ValueOf<typeof AdStatus>;

export const AdStatusColors: Record<ValueOf<typeof AdStatus>, string> = {
  [AdStatus.Approved]: 'green.6',
  [AdStatus.Rejected]: 'red.6',
  [AdStatus.RequestChanges]: 'yellow.6',
  [AdStatus.Draft]: 'gray',
  [AdStatus.Pending]: 'gray'
} as const;

export const AdStatusLabel: Record<ValueOf<typeof AdStatus>, string> = {
  [AdStatus.Approved]: 'Одобрено',
  [AdStatus.Rejected]: 'Отклонено',
  [AdStatus.RequestChanges]: 'Требует изменений',
  [AdStatus.Draft]: 'Черновик',
  [AdStatus.Pending]: 'На модерации'
} as const;

export const AdPriority = {
  Normal: 'normal',
  Urgent: 'urgent'
} as const;

export const SortBy = {
  CreatedAt: 'createdAt',
  Price: 'price',
  Priority: 'priority'
} as const;

export const SortOrder = {
  Asc: 'asc',
  Desc: 'desc'
} as const;

export const Period = {
  Today: 'today',
  Week: 'week',
  Month: 'month',
  Custom: 'custom'
} as const;

export const PeriodLabel: Record<ValueOf<typeof Period>, string> = {
  [Period.Today]: 'Сегодня',
  [Period.Week]: '7д',
  [Period.Month]: '30д',
  [Period.Custom]: 'Настраиваемый период'
};

export const ModerationAction = {
  Approved: 'approved',
  Rejected: 'rejected',
  RequestChanges: 'requestChanges'
} as const;

export const Reason = {
  Other: 'other',
  ForbiddenProduct: 'forbiddenProduct',
  WrongCategory: 'wrongCategory',
  BadDescription: 'badDescription',
  FraudSuspicion: 'fraudSuspicion',
  PhotoIssues: 'photoIssues'
} as const;

export type ReasonValues = ValueOf<typeof Reason>;

export const ReasonLabels = {
  [Reason.Other]: 'Другое',
  [Reason.ForbiddenProduct]: 'Запрещённый товар',
  [Reason.WrongCategory]: 'Неверная категория',
  [Reason.BadDescription]: 'Некорректное описание',
  [Reason.FraudSuspicion]: 'Подозрение на мошенничество',
  [Reason.PhotoIssues]: 'Проблемы с фото'
} as const;
