## O que são testes automatizados?

Os testes automatizados são definidos como programas que realizam testes em softwares que estão em construção de modo padronizado, sem que seja necessária a intervenção humana. Isso porque eles contam com funcionalidades que são capazes de testar automaticamente todos os aspectos de uma plataforma, a fim de garantir um desempenho adequado.

O procedimento traz muito mais precisão e agilidade para a etapa de testes, o que permite que você tenha facilidade para encontrar falhas de segurança, bugs e demais problemas que venham a prejudicar o uso da aplicação conforme projetado inicialmente.

É possível gerar diversos relatórios a partir da execução de testes automatizados, como o de cobertura, ou de testes que passaram com sucesso que podem ser usados como controle de qualidade do software. Além disso, os próprios testes funcionam como uma espécie de documentação. Por exemplo, se precisarmos saber o que acontece quando há uma entrada de senha errada, basta olharmos para o teste que faz referência a essa ação.

## Testes automatizados em React Native

Para aplicativos mobile há uma vasta quantidade de ferramentas disponíveis para a realização de testes automatizados, a seguir está listado algum deles: 

* **Jest**: é um interpretador de teste JavaScript para testar componentes individuais. Ele oferece velocidade de interação com recursos, como módulos de mocking e temporizadores;

* **React Native Testing Library**: permite testar componentes por meio de um conjunto de helpers;

* **Detox**: realiza testes de ponta a ponta em aplicativos que estejam sendo executados em dispositivos reais ou emuladores;

* **Cypress**: framework para testes de ponta a ponta é uma opção para testar de forma web aplicações mobile criadas com Expo CLI;

* **Appium**: utiliza um web driver para testar aplicações nativas ou web para dispositivos móveis e também sistemas híbridos no Android ou iOS.

## React Native Testing Library

Para instalar o React Native Testing Library, você precisa executar o seguinte comando no terminal:

```
npm install --save-dev @testing-library/react-native
```

Agora, vamos dar uma olhada em alguns exemplos básicos de como usar a biblioteca de teste.

### Exemplo 1: Testando a renderização de um componente

Suponha que você tenha um componente simples de botão, que é renderizado como um TouchableOpacity:

```typescript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
```

Aqui está um exemplo de como você pode testar se o botão é renderizado corretamente:

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Button label="Press me" />);
    const button = getByText('Press me');
    expect(button).toBeDefined();
  });

  test('fires onPress callback when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button label="Press me" onPress={onPressMock} />);
    const button = getByText('Press me');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
```

No exemplo acima, usamos render para renderizar o componente Button e getByText para selecionar o elemento de texto que diz "Press me". Em seguida, usamos expect para verificar se o elemento existe. No segundo teste, usamos fireEvent.press para simular um toque no botão e expect para verificar se a função onPress foi chamada.