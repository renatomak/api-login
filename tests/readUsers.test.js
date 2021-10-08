const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/api-login';

const url = 'http://localhost:3001';

describe('1 - Endpoint GET /users/:id', () => {
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
  
  
    it('It will be validated that the endpoint returns a user based on the route id', async () => {
      let result;

      await frisby
        .post(`${url}/users`, {
          name: 'renato',
          email: 'renato@gmail.com',
          password: '123456'
        })
        .expect('status', 201)
        .then((response) => {
          const { body } = response;
          result = JSON.parse(body);
          responseUserId = result._id;
        });
  
      await frisby.get(`${url}/users/${result.user._id}`)
        .expect('status', 200)
        .then((secondResponse) => {
          const { json } = secondResponse;
          const userName = json.result.name;
          const quantityuser = json.result.email;
          expect(userName).toEqual('renato');
          expect(quantityuser).toEqual('renato@gmail.com');
        });
    });
});