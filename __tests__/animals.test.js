const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /animals should return a list of animals', async () => {
    const resp = await request(app).get('/animals');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Momo',
        type: 'Cat',
        color: 'Black',
      },
      {
        id: '2',
        name: 'Stu',
        type: 'Cat',
        color: 'White & Grey',
      },
      {
        id: '3',
        name: 'Ghoul',
        type: 'Cat',
        color: 'Black',
      },
      {
        id: '4',
        name: 'Ozujsko',
        type: 'Dog',
        color: 'White & Brown',
      },
    ]);
  });
  it('#GET animals/:id should return a single animal', async () => {
    const resp = await request(app).get('/animals/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Stu',
      type: 'Cat',
      color: 'White & Grey',
    });
  });
  it('#POST /animals should create a new animal', async () => {
    const newAnimal = {
      name: 'Mikko',
      type: 'Dog',
      color: 'Black, Brown & White',
    };
    const resp = await request(app).post('/animals').send(newAnimal);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAnimal,
    });
  });
  it('#PUT /animals/:id should update an existing animal', async () => {
    const resp = await request(app).put('/animals/1').send({
      name: 'Da Goodest Boi'
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Da Goodest Boi');
  });
  afterAll(() => {
    pool.end();
  });
});
