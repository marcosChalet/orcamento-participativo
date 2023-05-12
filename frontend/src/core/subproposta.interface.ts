import {NavigationProp} from '@react-navigation/native';

interface SubpropostaInterface {
  key?: string;
  id: number;
  title: string;
  description: string;
  cost: number;
  imageUrl: string;
  author: string;
  changeState: (id: number) => void;
  nav: NavigationProp<any, any>;
}

export default SubpropostaInterface;
