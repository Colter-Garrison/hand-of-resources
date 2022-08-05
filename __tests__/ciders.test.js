const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /ciders should return a list of ciders', async () => {
    const resp = await request(app).get('/ciders');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Black Currant',
        producer: 'Finn River',
        location: 'Chimacum, WA',
        color: 'Deep Purple',
      },
      {
        id: '2',
        name: 'Ginja Ninja',
        producer: '2 Towns Ciderhouse',
        location: 'Corvallis, OR',
        color: 'Straw Yellow',
      },
      {
        id: '3',
        name: 'Kingston Black Cider',
        producer: 'Dragons Head Cider',
        location: 'Vashon, WA',
        color: 'Deep Yellow',
      },
      {
        id: '4',
        name: 'Premium Cider',
        producer: 'Ampleforth Abbey',
        location: 'Ampleforth, UK',
        color: 'Deep Yellow',
      },
      {
        id: '5',
        name: 'Sidra Natural',
        producer: 'Isastegi Sagardotegia',
        location: 'Tolosa, ESP',
        color: 'Light Gold',
      },
    ]);
  });
  it('#GET ciders/:id should return a single cider', async () => {
    const resp = await request(app).get('/ciders/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Ginja Ninja',
      producer: '2 Towns Ciderhouse',
      location: 'Corvallis, OR',
      color: 'Straw Yellow',
    });
  });
  afterAll(() => {
    pool.end();
  });
});
