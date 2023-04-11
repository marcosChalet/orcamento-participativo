# Como utilizar o Strapi

Nós podemos adicionar o Strapi no nosso projeto através da sua SDK. Caso você prefira, também é possível utilizá-lo realizando requisições para sua api através da biblioteca Axios, porém o SDK possui uma maior facilidade de uso e, como o propósito da disciplina não é passar muito tempo no Back-End, nós resolvemos utilizar o SDK.

Antes de utilizar o SDK, porém, nós precisamos criar um novo projeto do Strapi na nossa máquina. Este projeto irá iniciar um servidor Strapi local para que possamos utilizá-lo durante o desenvolvimento do projeto.

### Instalação do Strapi

Crie uma pasta para o servidor strapi e rode o seguinte comando:

```
npx create-strapi-app@latest strapi --quickstart
```

Quando a instalação tiver terminado, uma aba no navegador irá abrir para que seja criada uma conta de administrador desta aplicação Strapi. Após criar a conta e logar, é só utilizar a interface para configurar o Back-End como preferir.

### Instalação do SDK

Para instalar o SDK, faça:

```
npm install --save strapi-sdk-js
```

### Uso

Para utilizar o Strapi, primeiro importamos ele no projeto e criamos uma instância:

```typescript
import Strapi from "strapi-sdk-js";

const Strapi = new Strapi();
```

Podemos também criar um objeto com algumas outras opções, caso necessário:

```typescript
const Strapi = new Strapi({
    url: "http://localhost:1337",
    prefix: "/api",
    store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: {path: "/"},
    },
    axiosOptions: {},
});
```

### Métodos

A SDK do Strapi oferece vários métodos que permitem fazer operações de CRUD no Strapi, sendo os principais os seguintes:

- `find`
- `findOne`
- `count`
- `create`
- `update`
- `delete`

#### `find(contentType, params)`

Retorna uma lista de entradas que condizem com a *query* requisitada.

```typescript
await strapi.find('restaurants', {
  filters: {
    name: {
      $eq: 'La Fourchette'
    }
  },
  sort: 'name:asc',
  pagination: {
    start: 0,
    limit: 0
  },
  fields: [...];
  populate: [...] || '' || {};
  publicationState: 'live';
  locale: 'all'
})
```

#### `findOne(contentType, id, params)`

Retorna uma entrada específica pelo `id` da entrada. Pode se adicionar filtros para retornar campos e relações específicas.

```typescript
await strapi.findOne('restaurants', 1)
// with query filters
await strapi.findOne('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

#### `create(contentType, data, params)`

Cria uma entrada com os valores especificados e retorna o valor da entrada. Pode se adicionar filtros para retornar campos e relações específicas.

```typescript
await strapi.create('restaurants', { name: '' })
// with query filters
await strapi.create('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

#### `update(contentType, id, data, params)`

Atualiza uma entrada com um dado `id`.

```typescript
await strapi.update('restaurants', 1, { name: '' })
// with query filters
await strapi.update('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

#### `delete(contentType, id, params)`

Deleta uma entrada com um dado `id`.

```typescript
await strapi.delete('restaurants', 1)
// with query filters
await strapi.delete('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

### Outros métodos

A SDK do Strapi também oferece outros métodos úteis além dos mostrados acima. Os principais métodos além destes são os métodos de **Autenticação**, que incluem métodos como `login`, `logout`, `sendEmailConfirmation`, `resetPassword`, `fetchUser`, entre outros.

### Referências

- [Strapi SDK JS](https://strapi-sdk-js.netlify.app/)
- [Strapi Quick Start Guide](https://docs.strapi.io/dev-docs/quick-start)

