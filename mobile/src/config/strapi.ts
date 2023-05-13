import Strapi from 'strapi-sdk-js';
import {REACT_APP_STRAPI_KEY, REACT_APP_HOST, REACT_APP_PORT} from '@env';

const api = new Strapi({
  url: `http://${REACT_APP_HOST}:${REACT_APP_PORT}`,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: {path: '/'},
  },
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${REACT_APP_STRAPI_KEY}`,
      'Content-Type': 'application/json',
    },
  },
});

const strapi = api;

export default strapi;
