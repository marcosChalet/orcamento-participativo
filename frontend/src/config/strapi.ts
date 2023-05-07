import Strapi from 'strapi-sdk-js';
import {STRAPI_KEY, HOST, PORT} from '@env';

const localIP: string = HOST;
const port: number = PORT;
const strapiKey: string = `${STRAPI_KEY}`;

const api = new Strapi({
  url: `http://${localIP}:${port}`,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: {path: '/'},
  },
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${strapiKey}`,
      'Content-Type': 'application/json',
    },
  },
});

const strapi = api;

export default strapi;
