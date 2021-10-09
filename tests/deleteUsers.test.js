const frisby = require('frisby');
const { MongoClient } = require('mongodb');
const {
  STATUS_201_CREATED,
  STATUS_200_OK,
  STATUS_422_UNPROCESSABLE_ENTITY,
  STATUS_404_NOT_FOUND,
} = require('../src/util');

const mongoDbUrl = 'mongodb://localhost:27017/api-login';

const url = 'http://localhost:3001';

describe('4 - Endpoint DELETE /users/:id', () => {
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

  test('4.1 - It will be validated that it is possible to delete a user successfully', async () => {
    let result;

    await frisby
      .post(`${url}/users`, {
        name: 'renato',
        email: 'renato@gmail.com',
        password: '123456',
      })
      .expect('status', STATUS_201_CREATED)
      .then((response) => {
        const { body } = response;
        result = JSON.parse(body);
        responseUserId = result._id;
      });

    await frisby
      .delete(`${url}/users/${result.user._id}`)
      .expect('status', STATUS_200_OK)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const { message } = json;
        expect(message).toEqual('user removed successfully');
      });
  });

  test('4.2 - It will be validated that it is not possible to delete a user that does not exist', async () => {
    await frisby
      .delete(`${url}/users/999999`)
      .expect('status', STATUS_404_NOT_FOUND)
      .then((secondResponse) => {
        const { json } = secondResponse;
        const { message } = json;
        expect(message).toEqual('Error while delete');
      });
  });
});
