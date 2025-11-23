import ky from 'ky';

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 60000,
  retry: 2
});
