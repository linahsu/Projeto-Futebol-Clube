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

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TESTS - MATCHES', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Lista todos os jogos com sucesso', async function () {
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

  it('Lista todos os jogos em progresso com sucesso', async function () {
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

  it('Lista todos os jogos que não estão em progresso com sucesso', async function () {
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