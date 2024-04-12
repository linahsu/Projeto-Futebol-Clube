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

  // it('Lista um time com id existente com sucesso', async function () {
  //   // Arrange
  //   sinon
  //     .stub(SequelizeTeamModel, 'findOne')
  //     .resolves(teamMock.team as unknown as Model<ITeam>);

  //   // Act
  //   chaiHttpResponse = await chai.request(app).get('/teams/1');

  //   // Assert
  //   expect(chaiHttpResponse.status).to.be.eq(200);
  //   expect(chaiHttpResponse.body).to.deep.equal(teamMock.team);
  // });

  // it('Erro ao listar um time com id inexistente', async function () {
  //   // Arrange
  //   sinon
  //     .stub(SequelizeTeamModel, 'findOne')
  //     .resolves(null);

  //   // Act
  //   chaiHttpResponse = await chai.request(app).get('/teams/123');

  //   // Assert
  //   expect(chaiHttpResponse.status).to.be.eq(404);
  //   expect(chaiHttpResponse.body).to.deep.equal({ message: 'Team not found' });
  // });
});