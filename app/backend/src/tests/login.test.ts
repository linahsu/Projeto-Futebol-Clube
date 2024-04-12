import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUserModel from '../database/models/SequelizeUserModel'
import IUser from '../Interfaces/IUser'
import loginMock from './mocks/login.mock';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('INTEGRATION TESTS - LOGIN', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;

  it('Realiza login com sucesso, retornando um token', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);

    // Act
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.have.key('token');
  });

  it('Erro ao realizar o login sem o campo email', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: 'secret_admin',
    });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Erro ao realizar o login sem o campo senha', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Erro ao realizar o login com senha diferente a senha cadastrada no banco de dados', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);

    // Act
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'batatinha',
    });

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});

describe('INTEGRATION TESTS - LOGIN/ROLE', () => {
  beforeEach(function () { sinon.restore(); });

  let chaiHttpResponse: Response;
  it('Lista o tipo do usuário "role" com sucesso', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(loginMock.user as unknown as Model<IUser>);
    
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcxMjg2Mzg3MX0.A-QAreLjBQnAsQvdH8jH470lkMX8qMi_G9R6O-450-U'

    // Act
    chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.deep.eq({ role: 'admin' });
  });

  it('Erro ao listar o tipo do usuário "role" com token inexistente', async function () {
    // Arrange

    // Act
    chaiHttpResponse = await chai.request(app).get('/login/role');

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.eq({ message: 'Token not found' });
  });

  it('Erro ao listar o tipo do usuário "role" com token inválido', async function () {
    // Arrange
    sinon
      .stub(SequelizeUserModel, 'findOne')
      .resolves(null);
    
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcxMjg2Mzg3MX0.A-QAreLjBQnAsQvdH8jH470lkMX8qMi_G9R6O-450-U'

    // Act
    chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', token);

    // Assert
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body).to.deep.eq({ message: 'Token must be a valid token' });
  });
});
