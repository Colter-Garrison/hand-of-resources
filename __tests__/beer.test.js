const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /beers should return a list of beers', async () => {
    const resp = await request(app).get('/beers');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'Party Time Pils',
        style: 'German Pilsner',
        producer: 'Wayfinder Beer',
        location: 'Portland, OR'
      },
      {
        id: '2',
        name: 'El Guapo',
        style: 'Blonde Ale',
        producer: 'New Spring Brewing',
        location: 'Albany, OR'
      },
      {
        id: '3',
        name: 'Dry Stout',
        style: 'Irish Stout',
        producer: 'Ferment',
        location: 'Hood River, OR'
      },
      {
        id: '4',
        name:  'Maibock',
        style: 'Hell/Maibock',
        producer:  'Buoy Beer Company',
        location:  'Astoria, OR'
      },
      {
        id:  '5',
        name: 'DREAMLAND',
        style: 'Sour',
        producer: 'Black Project',
        location: 'Denver, CO'
      },
      {
        id: '6',
        name: 'Orange Gose',
        style: 'Fruited Gose',
        producer: 'Pohjala',
        location: 'Tallinn, Harjumaa Estonia'
      },
    ]);
  });
  it('#GET beers/:id should return a single beer', async () => {
    const resp = await request(app).get('/beers/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'El Guapo',
      style: 'Blonde Ale',
      producer: 'New Spring Brewing',
      location: 'Albany, OR'
    });
  });
  it('#POST /beers should create a new beer', async () => {
    const newBeer = {
      name: 'RPM IPA',
      style: 'IPA',
      producer: 'Boneyard',
      location: 'Bend, OR',
    };
    const resp = await request(app).post('/beers').send(newBeer);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newBeer,
    });
  });
  it('#PUT /beers/:id should update an existing beer', async () => {
    const resp = await request(app).put('/beers/1').send({
      style: 'this is beer',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.style).toBe('this is beer');
  });
  it('#Delete /beers/:id should delete a beer', async () => {
    const resp = await request(app).delete('/beers/1');
    expect(resp.status).toBe(200);
    const beerResp = await request(app).get('/beers/1');
    expect(beerResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
