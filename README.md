# Boas vindas ao repositório do Projeto Futebol Clube!

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Desenvolvi uma API (utilizando o método `TDD`) e também integrei *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. O desenvolvimento **respeitou as regras de negócio** providenciadas no projeto e **a API é capaz de ser consumida por um front-end que já foi previamente provido nesse projeto** pela instituição de ensino **Trybe**.

  O back-end implementa as regras de negócio para popular adequadamente a tabela disponível no front-end que é exibida para a pessoa usuária do sistema.
  
# Detalhes

<details>
<summary><strong>🏟️ Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - É um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3306` do `localhost`;

2️⃣ **Back-end:**
 - Ambiente que foi realizada a maior parte das implementações feitas por mim.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;

3️⃣ **Front-end:**
  - O front já foi implementado pela Trybe. 
  - Dockerfile foi configurado por mim.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;

</details>

<details>
  <summary><strong> 📝 Habilidades trabalhadas</strong></summary><br />

* Typescript
* Docker.
* Biblioteca Mocha na prática do TDD.
* Manipulação do mySQL com o Sequelize.
* Json Web Token.
* Programação orientada a Objetos
* API REST

</details>

# Orientações

<details>
  <summary><strong>🚀 Como executar o Projeto</strong></summary><br />

1. Clone o repositório

* Use o comando: `git@github.com:linahsu/Projeto-Futebol-Clube.git`.
* Entre na pasta do repositório que você acabou de clonar:
  * `cd Projeto-Futebol-Clube`

2. 🐳 Utilize o Docker

Execute na raíz do projeto:

```bash
npm run compose:up
```

A aplicação já será inicializada automaticamente na url http://localhost:3000/

</details>

<details>
  <summary><strong>🎛 Linter</strong></summary><br />

  Este projeto utiliza o ESLint para fazer a análise estática do código.

  Para rodar o linter localmente deste projeto, execute o comando a seguir:

  ```bash
  npm run lint
  npm run lint:styles
  ```

</details>

<details>
  <summary><strong>🛠 Testes</strong></summary><br />

  Para executar os testes execute o comando a seguir:

  ```bash
  npm run test
  ```