import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel'
import ITeam from '../Interfaces/ITeam'
import teamMock from './mocks/team.mock';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TESTS - TEAMS', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Lista todos os times com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeTeamModel, 'findAll')
      .resolves(teamMock.teams as unknown as Model<ITeam>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/teams');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamMock.teams);
  });

  it('Lista um time com id existente com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeTeamModel, 'findOne')
      .resolves(teamMock.team as unknown as Model<ITeam>);

    // Act
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamMock.team);
  });

  it('Erro ao listar um time com id inexistente', async function () {
    // Arrange
    sinon
      .stub(SequelizeTeamModel, 'findOne')
      .resolves(null);

    // Act
    chaiHttpResponse = await chai.request(app).get('/teams/123');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(404);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Team not found' });
  });
});

 /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });