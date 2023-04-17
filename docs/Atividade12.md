- Fundamentos de programação assíncrona

  Síncrono é aquilo que ocorre simultaneamente. Da mesma forma, a programação síncrona é aquela que ocorre simultaneamente, ao mesmo tempo. 
  Na programação assíncrona as funções não são executadas em ordem. Com o assincronismo podemos interromper o código para conseguirmos alguma outra informação necessária para a continuar a execução. Isso significa que o código espera por uma outra parte do código e, enquanto espera, executa as demais partes.
  Quando uma ou mais operações são demoradas, pode ser interessante executá-las de maneira assíncrona, para que o restante do código possa ser executado sem precisar esperar que elas terminem. Nesse caso, o código seguinte ao comando que dispara a operação assíncrona não pode contar com o resultado dessa operação, naturalmente. Tudo que dependa do resultado da operação precisa ser feito somente quando ela tiver sido concluída, e geralmente isso ocorre num callback, isto é, um bloco de código (geralmente uma função ou método) informado ao comando que inicia a operação assíncrona.

- Como usar em Javascript

  - Promises:
  As Promises são objetos que representam a eventual conclusão ou falha de uma operação assíncrona. Elas podem ser usadas para lidar com operações assíncronas, como leitura e escrita em arquivos, requisições HTTP, etc. Para utilizar Promises, você pode criar uma nova Promise utilizando o construtor Promise() e definir as funções de callback .then() para sucesso e .catch() para falha.
  - Callbacks:
  Os callbacks são funções passadas como parâmetro para outras funções, que são chamadas após o término de uma operação assíncrona. Eles são usados para lidar com operações assíncronas, como leitura e escrita em arquivos, requisições HTTP, etc.
  - Async/await:
  Async/await é uma forma de escrever código assíncrono que se parece com código síncrono. É uma abstração em cima de Promises, e é usada para lidar com operações assíncronas, como leitura e escrita em arquivos, requisições HTTP, etc.


- Qual a importância do assunto para o desenvolvimento do seu projeto em React Native

  As chamadas de API são extremamente importantes para o desenvolvimento de um projeto em React Native de votação, pois esse tipo de aplicativo geralmente precisa se comunicar com um servidor para enviar e receber dados de votação.
  Por exemplo, imagine que você esteja desenvolvendo um aplicativo de votação em React Native para uma eleição e que os usuários possam votar em seus candidatos favoritos. Para garantir que o aplicativo seja seguro e escalável, você precisa armazenar os resultados da votação em um servidor centralizado. Isso significa que você precisa enviar os votos dos usuários do aplicativo para o servidor e receber os resultados da votação do servidor de volta para o aplicativo.
  Para fazer isso, você precisará usar chamadas de API HTTP para enviar e receber dados do servidor. Essas chamadas de API permitem que o aplicativo se comunique com o servidor e envie e receba informações, como os votos dos usuários e os resultados da votação.
  Ao usar chamadas de API bem projetadas e otimizadas em seu aplicativo de votação em React Native, você pode garantir que o aplicativo seja eficiente, escalável e seguro. Além disso, as chamadas de API permitem que você integre facilmente outras funcionalidades e serviços em seu aplicativo, como autenticação de usuários e integração de mídia social.
