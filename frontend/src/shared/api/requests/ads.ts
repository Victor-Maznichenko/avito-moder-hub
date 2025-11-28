import { api } from '@/shared/api/instance';

interface BaseAdParams {
  id: number | string;
}

interface UnsuitableAdParams extends BaseAdParams, PostAdUnsuitableParams {}

// Получить список объявлений с фильтрацией и пагинацией
export const getAds = ({ status, ...rest }: GetAdsParams = {}) => {
  const baseParams = Object.entries(rest);
  const statusParams = status?.map((s) => ['status', s]) ?? [];
  return api.get<GetAdsResponse>('ads', { searchParams: [...baseParams, ...statusParams] }).json();
};

// Получить объявление по ID
export const getAd = ({ id }: BaseAdParams) => api.get<Advertisement>(`ads/${id}`).json();

// Одобрить объявление
export const postAdApprove = ({ id }: BaseAdParams) =>
  api.post<PostAdResponse>(`ads/${id}/approve`).json();

// Отклонить объявление
export const postAdReject = ({ id, ...body }: UnsuitableAdParams) =>
  api.post<PostAdResponse>(`ads/${id}/reject`, { json: body }).json();

// Запросить изменения в объявлении
export const postAdRequestChanges = ({ id, ...body }: UnsuitableAdParams) =>
  api.post<PostAdResponse>(`ads/${id}/request-changes`, { json: body }).json();
