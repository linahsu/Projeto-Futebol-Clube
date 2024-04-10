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

describe('Seu teste', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(SequelizeTeamModel, "findAll")
  //     .resolves(teamMock.teams as unknown as Model<ITeam>[]);
  // });

  // after(() => {
  //   (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
  // })

  it('Lista todos os times com sucesso', async function () {
    // Arrange
    // const findAllReturn = teamMock.teams.map((team) => SequelizeTeamModel.build(team));
    // sinon.stub(SequelizeTeamModel, 'findAll').resolves(findAllReturn);
    sinon
      .stub(SequelizeTeamModel, "findAll")
      .resolves(teamMock.teams as unknown as Model<ITeam>[]);

    // Act
    chaiHttpResponse = await chai.request(app).get('/teams');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.equal(teamMock.teams);

    (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
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
});
