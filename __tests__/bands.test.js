const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /bands should return a list of bands', async () => {
    const resp = await request(app).get('/bands');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'King Gizzard & the Lizard Wizard',
        members: 6,
        genre: 'Garage Rock',
      },
      {
        id: '2',
        name: 'Led Zeppelin',
        members: 4,
        genre: 'Classic Rock',
      },
      {
        id: '3',
        name: 'Gojira',
        members: 4,
        genre: 'Technical Death Metal',
      },
      {
        id: '4',
        name: 'STS9',
        members: 5,
        genre: 'Jam Band',
      },
      {
        id: '5',
        name: 'Lotus',
        members: 5,
        genre: 'Jam Band',
      },
    ]);
  });
  it('#GET bands/:id should return a single band', async () => {
    const resp = await request(app).get('/bands/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Led Zeppelin',
      members: 4,
      genre: 'Classic Rock',
    });
  });
  it('#POST /bands should create a new band', async () => {
    const newBand = {
      name: 'moe.',
      members: 5,
      genre: 'Jam Band',
    };
    const resp = await request(app).post('/bands').send(newBand);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBand,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
