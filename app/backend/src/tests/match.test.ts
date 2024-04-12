import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel'
import IMatch from '../Interfaces/IMatch'
import matchMock from './mocks/match.mock';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import loginMock from './mocks/login.mock';
import IUser from '../Interfaces/IUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TESTS - GET MATCHES', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Lista todas as partidas com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeMatchModel, 'findAll')
      .resolves(matchMock.matches as unknown as Model<IMatch>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/matches');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.matches);
  });

  it('Lista todas as partidas em progresso com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeMatchModel, 'findAll')
      .resolves(matchMock.matchesInProgress as unknown as Model<IMatch>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.matchesInProgress);
  });

  it('Lista todas as partidas que não estão em progresso com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeMatchModel, 'findAll')
      .resolves(matchMock.matchesNotInProgress as unknown as Model<IMatch>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.matchesNotInProgress);
  });
});

describe('INTEGRATION TESTS - PATCH MATCHES', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Altera a chave inProgress para false quando uma partida é finalizada com sucesso', async function () {
    // Arrange
    // stub from authToken
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);
    // stub from MatchModel 
    const mockFindOneReturn = SequelizeMatchModel.build(matchMock.match);
    sinon
      .stub(SequelizeMatchModel, 'findOne')
      .resolves(mockFindOneReturn);
    sinon
      .stub(mockFindOneReturn, 'update')
      .resolves();

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcxMjk0NTEwOX0.4KFx9faV8UqT-hhFGoE4wGo0zM1Zs3LjaIn2tdnQfdc';

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/41/finish')
      .set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Finished' });
  });

  it('Erro ao tentar finalizar uma partida sem o token', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Erro ao tentar finalizar uma partida com um token inválido', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(null);

    const token = 'Bearer huanlnklmç2729xjwhdiwon789u0cnjscn';

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Atualiza uma partida com sucesso', async function () {
    // Arrange
    // stub from authToken
    sinon.stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);
    // stub from MatchModel
    const mockFindOneReturn = SequelizeMatchModel.build(matchMock.match);
    sinon
      .stub(SequelizeMatchModel, 'findOne')
      .resolves(mockFindOneReturn);
    sinon
      .stub(mockFindOneReturn, 'update')
      .resolves();

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcxMjk0NTEwOX0.4KFx9faV8UqT-hhFGoE4wGo0zM1Zs3LjaIn2tdnQfdc';

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/1')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      })
      .set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal({
      homeTeamGoals: 3,
      awayTeamGoals: 1,
    });
  });

  it('Erro ao tentar atualizar uma partida sem o token', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/1')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Erro ao tentar atualizar uma partida com um token inválido', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(null);

    const token = 'Bearer huanlnklmç2729xjwhdiwon789u0cnjscn';

    // Act
    chaiHttpResponse = await chai.request(app).patch('/matches/1')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      })
      .set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  });
});

describe('INTEGRATION TESTS - POST MATCHES', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Cadastra uma nova partida em andamento com sucesso', async function () {
    // Arrange
    // stub from authToken
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);
    // stub from MatchModel
    sinon
      .stub(SequelizeMatchModel, 'create')
      .resolves();
    (SequelizeMatchModel.findOne as sinon.SinonStub).restore();

    sinon
      .stub(SequelizeMatchModel, 'findOne')
      .resolves(matchMock.createdMatch as unknown as Model<IMatch>);

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcxMjg2Mzg3MX0.A-QAreLjBQnAsQvdH8jH470lkMX8qMi_G9R6O-450-U'

    // Act
    chaiHttpResponse = await chai.request(app).post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      })
      .set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchMock.createdMatch);
  });

  it('Error ao cadastrar uma nova partida sem um token', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).post('/matches')
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Error ao cadastrar uma nova partida com dois times iguais na requisição', async function () {

  });

  it('Error ao cadastrar uma nova partida com um time que não existe no banco de dados', async function () {

  });
});