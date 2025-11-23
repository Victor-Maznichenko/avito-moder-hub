import { api } from '@/shared/api/instance';

// Получить информацию о текущем модераторе
export const getModeratorsMe = () => api.get<Moderator>('moderators/me ').json();
