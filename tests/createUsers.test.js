const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/api-login';

const url = 'http://localhost:3001';

const postUserMock = {
  user: {
    name: 'user1',
    email: 'user1@test.com.br',
  },
};

describe('1 - Endpoint POST /users', () => {
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
      name: 'admin', email: 'root@email.com', password: 'admin' };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });


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
        postUserMock.user = { ...postUserMock.user, _id: json.user._id}  
        expect(json).toEqual(postUserMock);
      });
  });

  it('It will be validated that the "email" field is unique', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'fulano de Tal',
          email: 'fulanodetal@gmail.com',
          password: '12345678',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/users/`,
        {
          name: 'Xablau',
          email: 'fulanodetal@gmail.com',
          password: '12345678',
        })
      .expect('status', 409)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('User already registered!');
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
        expect(json).toEqual({ message: 'The "name" field is mandatory.' });
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
        expect(json).toEqual({
          message: 'The "name" field must be at least 3 characters long',
        });
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
        expect(json).toEqual({ message: 'The "email" field is mandatory' });
      });
  });

  test('It will be validated that it is not possible to register a user with an email in the wrong format - without @', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'user',
        email: 'usertest.br',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });
  });

  test('It will be validated that it is not possible to register a user with an email in the wrong format - without the provider', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'user',
        email: 'user@',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });
  });

  test('It will be validated that it is not possible to register a user with an email in the wrong format - without the user name', async () => {
    await frisby
      .post(`${url}/users`, {
        name: 'user',
        email: '@test.com.br',
        password: '123456',
      })
      .expect('status', 400)
      .then((responseCreate) => {
        const { json } = responseCreate;
        expect(json).toEqual({
          message: 'The "email" must have the format "email@email.com"',
        });
      });
  });
});
