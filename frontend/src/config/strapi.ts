import Strapi from 'strapi-sdk-js';

let localIP: string = '192.168.18.6';

const api = new Strapi({
  url: `http://${localIP}:1337`,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: {path: '/'},
  },
  axiosOptions: {
    headers: {
      Authorization:
        'Bearer c1033061656d04bbffe60c9227b863a7c6f5b0f8f32f8c972ce413b44571fbca86cfa7c0ad13cd63f39646bdc5a1bd61503bf2598837e17d28743f8c913f88676d10c7388acf199b536b7ffef949fe0150d33499554ce07e9b5807a563c225dd0eb0ff4e8caccf1411c3e1fdef531d989228bfd95485e925169a647c5ce24e38',
      'Content-Type': 'application/json',
    },
  },
});

const strapi = api;

export default strapi;
