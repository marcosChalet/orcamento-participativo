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
        'Bearer 007148e1a6b00a92799455c6e9bf4b579c9c9b15d2a8edd3998ecca52078b5abc5d926dee83e8ffcccecde272f630816110f60844f1420b6fd739158d43ddfd2862089dbcb394f9314bfdcb2d9dcedafdf5f13cd0ab489a0814f720bb47b8c467309c8f60fcf6b6de25e1bb89c9828570c7e3bd82bf5ffdcb65bd321fecf9acb',
      'Content-Type': 'application/json',
    },
  },
});

const strapi = api;

export default strapi;
