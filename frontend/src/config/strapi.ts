import Strapi from 'strapi-sdk-js';
import {STRAPI_KEY, HOST, PORT} from '@env';

const api = new Strapi({
  url: `http://${HOST}:${PORT}`,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: {path: '/'},
  },
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${STRAPI_KEY}`,
      'Content-Type': 'application/json',
    },
  },
});

const strapi = api;

export default strapi;
