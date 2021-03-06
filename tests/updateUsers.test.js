const frisby = require('frisby');
const { MongoClient } = require('mongodb');
const {
  STATUS_201_CREATED,
  STATUS_409_CONFLICT,
  STATUS_200_OK,
  STATUS_400_BAD_REQUEST,
} = require('../src/util');

const mongoDbUrl = 'mongodb://localhost:27017/api-login';

const url = 'http://localhost:3001';

describe('3 - Endpoint PUT /users/:id', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('api-login');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    const users = {
      name: 'admin',
      email: 'root@email.com',
      password: 'admin',
    };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  test('3.1 - It will be validated that it is possible to update a user successfully', async () => {
    let resultUserId;

    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'user1',
          email: 'user1@test.com.br',
          password: '123456',
        },
      })
      .expect('status', STATUS_201_CREATED)
      .then((responseCreate) => {
        const { json } = responseCreate;
        resultUserId = json.user._id;
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'Renato Marques',
        email: 'renato.mark@gmail.com',
        password: '123456',
      })
      .expect('status', STATUS_200_OK)
      .then((secondResponse) => {
        const {
          json: { user },
        } = secondResponse;
        const userName = user.name;
        const userEmail = user.email;
        expect(userName).toEqual('Renato Marques');
        expect(userEmail).toEqual('renato.mark@gmail.com');
      });
  });

  test('3.2 - It will be validated that the "email" field is unique', async () => {
    let resultUserId;

    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'renato',
          email: 'renato@test.com.br',
          password: '123456',
        },
      })
      .expect('status', STATUS_201_CREATED);

    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'user',
          email: 'user@test.com.br',
          password: '123456',
        },
      })
      .expect('status', STATUS_201_CREATED)
      .then((responseCreate) => {
        const { json } = responseCreate;
        resultUserId = json.user._id;
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        email: 'renato@test.com.br',
      })
      .expect('status', STATUS_409_CONFLICT)
      .then((secondResponse) => {
        const { json } = secondResponse;
        expect(json).toEqual({
          message: 'User already registered!',
        });
      });
  });

  test('3.3 - It will be validated that it is not possible to update a record with an invalid email field.', async () => {
    let resultUserId;

    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'user',
          email: 'user@test.com.br',
          password: '123456',
        },
      })
      .expect('status', STATUS_201_CREATED)
      .then((responseCreate) => {
        const { json } = responseCreate;
        resultUserId = json.user._id;
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'Renato Marques',
        email: 'renato.markgmail.com',
        password: '123456',
      })
      .expect('status', STATUS_400_BAD_REQUEST)
      .then((secondResponse) => {
        const { json } = secondResponse;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'Renato Marques',
        email: '@gmail.com',
        password: '123456',
      })
      .expect('status', STATUS_400_BAD_REQUEST)
      .then((secondResponse) => {
        const { json } = secondResponse;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'Renato Marques',
        email: 'renato.mark@',
        password: '123456',
      })
      .expect('status', STATUS_400_BAD_REQUEST)
      .then((secondResponse) => {
        const { json } = secondResponse;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });
  });

  test('3.4 - It will be validated that it is not possible to update a record with an invalid name field.', async () => {
    let resultUserId;

    await frisby
      .post(`${url}/users`, {
        body: {
          name: 'user',
          email: 'user@test.com.br',
          password: '123456',
        },
      })
      .expect('status', STATUS_201_CREATED)
      .then((responseCreate) => {
        const { json } = responseCreate;
        resultUserId = json.user._id;
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'us',
      })
      .expect('status', STATUS_400_BAD_REQUEST)
      .then((secondResponse) => {
        const { json } = secondResponse;
        expect(json).toEqual({
          message: 'The "name" field must be at least 3 characters long',
        });
      });
  });
});
