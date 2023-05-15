import strapi from '../config/strapi';
import PropostaInterface from '../core/proposta.interface';
import {REACT_APP_HOST, REACT_APP_PORT} from '@env';

type OmitNavProposta = Omit<PropostaInterface, 'nav'>;

async function getPropostas() {
  return strapi
    .find('propostas', {
      filters: {
        data_final: {
          $gte: '2023-04-12',
        },
      },
      populate: '*',
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export default function useProposta() {
  function loadProposta(setPropostas: (p: OmitNavProposta[]) => void) {
    let p: Array<OmitNavProposta> = [];
    getPropostas()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let proposta = data[i].attributes;
          let tags: Array<string> = [];
          let capa =
            `http://${REACT_APP_HOST}:${REACT_APP_PORT}` +
            proposta.capa.data.attributes.url;
          let autor = proposta.usuario.data.attributes.nome;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const [key, value] of Object.entries(proposta.tags)) {
            tags.push(String(value));
          }
          p.push({
            key: data[i].id,
            id: data[i].id,
            title: proposta.titulo,
            description: proposta.descricao,
            tags: tags,
            cost: proposta.valor,
            author: autor,
            finalDate: new Date(proposta.data_final),
            imageUrl: capa,
            textBody: proposta.texto,
            type: proposta.Tipo,
          });
        }
        setPropostas(p);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return loadProposta;
}
