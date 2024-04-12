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
    sinon
      .stub(SequelizeMatchModel, 'findOne')
      .resolves(matchMock.match as unknown as Model<IMatch>);
    sinon
      .stub(SequelizeMatchModel, 'update')
      .resolves();

    const token = 'Bearer huanlnklmç2729xjwhdiwon789u0cnjscn';

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
});