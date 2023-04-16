# ATIVIDADE 10 - BAAS (Backend as a Service)

## O que é um BaaS

> Um BaaS ou Backend as a Service é um modelo de serviço em nuvem no qual há a terceirização do desenvolvimento do backend à plataformas como Firebase, Back4App, Strapi... Dando a liberdade do desenvolvedor focar no desenvolvimento do front-end.


## Vantagens

- Velocidade de desenvolvimento
- Facilidade de desenvolvimento
- Segurança
- Escalabilidade sem interrupções
- Não necessidade de gerenciamento
- Integração entre serviços


## Desvantagens

- Não controle do serviço
- Dependência da integridade do fornecedor para com seus dados
- Necessidade de mudança caso seu fornecedor venha a sair do mercado
- Limitação de funcionalidades


## Compatibilidade E Uso Do Parse Com React Native

O Parse oforece SDKs para a criação de backends mobile para Windows 8, Windows Phone 8, iOS, Android, JavaScript e OSx. Assim, com o módulo npm do Parse, há como utilizá-lo com **_Node.js_** e **_React Native_** com a sintaxe mostrada a baixo.

```
// In a node.js environment
const Parse = require('parse/node');
```

```
// In a React Native application
const Parse = require('parse/react-native.js');

// On React Native >= 0.50 and Parse >= 1.11.0, set the Async
const AsyncStorage = require('react-native').AsyncStorage;
Parse.setAsyncStorage(AsyncStorage);
```

## Principais Recursos do Parse

- Banco de dados (NoSQL ou SQL)
- APIs (REST ou GraphQL)
- Funções da nuvem
- Consultas em tempo real
- Autenticação
- Notificações (notificações push, notificações por email)
- Armazenamento de arquivo
- Integração de mídia social


## Motivação para uso do Strapi

Pela possibilidade de hospedar de forma gratuita no servidor da UFCA, há um maior apelo ao uso do Strapi quando comparado com o Firebase (que para nossa equipe, pela facilidade, seria a primeira opção).
