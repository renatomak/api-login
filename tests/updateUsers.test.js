const frisby = require('frisby');
const { MongoClient } = require('mongodb');

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

  test('It will be validated that it is possible to update a user successfully', async () => {
    let result;
    let resultUserId;

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
        resultUserId = json.user._id;
      });

    await frisby
      .put(`${url}/users/${resultUserId}`, {
        name: 'Renato Marques',
        email: 'renato.mark@gmail.com',
      })
      .expect('status', 200)
      .then((secondResponse) => {
        const { json: { user } } = secondResponse;
        const userName = user.name;
        const userEmail = user.email;
        expect(userName).toEqual('Renato Marques');
        expect(userEmail).toEqual('renato.mark@gmail.com');
      });
  });
});
