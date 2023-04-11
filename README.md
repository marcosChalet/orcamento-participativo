<h2 align="center"><b>Orçamento Participativo</b></h2>

</br>

![Status](http://img.shields.io/static/v1?label=STATUS&message=WIP&color=dd3333&style=for-the-badge)&nbsp;

</br>

### **_Programação Para Dispositivos Móveis (CC0044) - Rafael Perazzo_**

> Este projeto tem como escopo exercitar, colocar em prática e demonstrar as habilidades adquiridas durante a cadeira de desenvolvimento mobile na Universidade Federal do Cariri (UFCA).
> Ele se resume a um APP desenvolvido com React Native, TypeScript e integrado com o Strapi.
>
> **_Clique [aqui](Atividade2.md) para ter acesso ao domínio do projeto_**.

### Sobre o Projeto de Orçamento Participativo

O objetivo do projeto é criar um app para aumentar a participação nas decisões e divisões orçamentárias da Universidade Federal do Cariri (UFCA). Basicamente, os membros da comunidade da UFCA poderão utilizar o app para visualizar, propor, apoiar e votar em projetos. Os membros da gestão da UFCA poderão utilizar o app para colocar propostas para votação e visualizar as propostas da comunidade mais apoiadas como base para elaboração de projetos futuros.

### Algoritmos

Para as votações, nós pretendemos implementar alguns algoritmos que funcionam para cada caso específico.

#### Votaçaõ de $k$ projetos cuja soma dos custos é no máximo o Orçamento Total

Imagine que um setor da UFCA, digamos a Pró-Reitoria da Assistência Estudantil, tenha recebido um orçamento $X$ e deseja utilizar este orçamento para implementar algumas modalidades de auxílios. Porém, com o orçamento $X$ não é possível implementar todas as modalidades pois a soma dos custos de cada modalidade de auxílio ultrapassa o orçamento total. Neste caso, é necessário então selecionar uma quantidade $k$ de projetos para serem implementados tal que a soma dos custos destes projetos é no máximo $X$.

Para isto, nós vamos utilizar o algoritmo **KnapSack Voting**, descrito em um [trabalho da Universidade de Stanford](https://dl.acm.org/doi/pdf/10.1145/3340230) e [utilizado já em alguns distritos e cidades](https://pbstanford.org/).

### Divisão de um orçamento $X$ em várias áreas

Imagine agora que a reitoria da UFCA recebeu uma quantia $X$ de dinheiro e precisa dividir este dinheiro em algumas áreas, por exemplo nas áreas Assistência Estudantil, Estágios e Bolsas. Então, ela resolve fazer um consulta utilizando o nosso app para saber exatamente quanto deve ser alocado para cada área. Neste caso, há dois algoritmos possíveis.

##### 1. [Conditional Utilitarian Rule](https://www.cs.toronto.edu/~nisarg/papers/pb_chapter.pdf)

Neste algoritmo, cada votante escolhe a forma que ele deseja repartir o valor $X$ entre as áreas. Após o final da votação, digamos que $n$ pessoas votaram. Então, cada votante contribui em 1/n do valor total de acordo com a forma que ele repartiu na sua votação. Deste modo, é como se cada votante tivesse direito a uma parte igualitária de 1/n do valor total para dividir da sua maneira entre as áreas, agregando no final todos os votos para decidir o valor final de cada área.

##### 2. [Local Iterative Voting](https://stacks.stanford.edu/file/druid:mf806mq4601/Final-augmented.pdf)

Neste algoritmo, é feito uma votação iterativa onde cada membro da comunidade vota por vez. Inicia-se o algoritmo com um determinado raio de forma que cada pessoa que vota pode escolher valores que satisfaçam este raio de distância do valor atual. A cada passo, o valor atual é atualizado de acordo com o voto da iteração atual e a cada iteração o raio é diminuído. Desta forma, cada pessoa que for votar precisa "levar em conta" os votos das pessoas que votaram, uma vez que ela precisa escolher valores somente a determinado raio de distância dos valores atuais. Ao fim da votação, é retornado os valores finais da votação juntamente com o valor do raio no fim da votação, de forma que a gestão pode escolher valores dentro deste raio para dividir entre as áreas.

### Escolha de um projeto para implementar dentre vários

Este será uma simples de votação como já conhecemos, elegendo um projeto dentre $k$ projetos para ser implementado. Ainda vamos analisar e escolher o algoritmo para ser implementado neste caso.