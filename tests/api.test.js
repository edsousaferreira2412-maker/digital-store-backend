const request = require('supertest');
const app = require('../server');
const sequelize = require('../src/config/database');

describe('Testes da API Digital Store', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  test('Deve responder que a API está funcionando', async () => {
    const resposta = await request(app).get('/');

    expect(resposta.status).toBe(200);
    expect(resposta.body.mensagem).toBe(
      'API Digital Store funcionando!'
    );
  });

  test('Deve listar os produtos', async () => {
    const resposta = await request(app).get('/produtos');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test('Deve listar as categorias', async () => {
    const resposta = await request(app).get('/categorias');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });
});