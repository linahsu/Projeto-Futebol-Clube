import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import IMatch from '../Interfaces/IUser';
import leaderBoardMock from './mocks/leaderBoard.mock';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TESTS - LOGIN', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Lista as informações de desempenho dos times da casa com sucesso na ordem correta', async function () {
    // Arrange
    sinon
      .stub(SequelizeMatchModel, 'findAll')
      .resolves(leaderBoardMock.matches as unknown as Model<IMatch>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq(leaderBoardMock.homeTeams);
  });
});