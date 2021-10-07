const frisby = require('frisby');

const url = 'http://localhost:3001';

const postUserMock = {
  user: {
    name: 'user1',
    email: 'user1@test.com.br',
  },
};

describe('1 - endpoint POST /users', () => {
  test('It will be valid that it is possible to register a user successfully', async () => {
    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'user1',
          email: 'user1@test.com.br',
          password: '123456',
        },
      })
      .expect('status', 201)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual(postUserMock);
      });
  });

  test('It will be validated that it is not possible to register an unnamed user', async () => {
    await frisby
      .post(`${url}/users`, {
        email: 'user1@test.com.br',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({ message: 'O campo "name" é obrigatório' });
      });
  });

  test('It will be validated that it is not possible to register a user with a name of less than 3 characters', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'us',
        email: 'user1@test.com.br',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({ message: 'O campo "name" deve ter pelo menos 3 caracteres' });
      });
  });

  test('It will be validated that it is not possible to register a user without the email field', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'user',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({ message: 'O campo "email" é obrigatório' });
      });
  });
});
