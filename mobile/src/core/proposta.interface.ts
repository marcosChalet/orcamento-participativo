import {NavigationProp} from '@react-navigation/native';

interface PropostaInterface {
  key?: number;
  title: string;
  description: string;
  tags: Array<string>;
  cost: number;
  author: string;
  finalDate: Date;
  imageUrl: string;
  id: number;
  textBody: string;
  type: string;
  nav: NavigationProp<any, any>;
}

export default PropostaInterface;
