const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /snails should return a list of snails', async () => {
    const resp = await request(app).get('/snails');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: '1',
        name: 'China Moon Snail',
        scientific_name: 'Naticarius onca',
        image: 'https://inaturalist-open-data.s3.amazonaws.com/photos/23107852/large.jpg',
      },
      {
        id: '2',
        name: 'Eastern Heath Snail',
        scientific_name: 'Xerolenta obvia',
        image: 'https://inaturalist-open-data.s3.amazonaws.com/photos/220049212/original.jpeg',
      },
      {
        id: '3',
        name: 'White-mouth Turritella',
        scientific_name: 'Turritella leucostoma',
        image: 'https://inaturalist-open-data.s3.amazonaws.com/photos/220044868/original.jpg',
      },
      {
        id: '4',
        name: 'Garden Snail',
        scientific_name: 'Cornu aspersum',
        image: 'https://static.inaturalist.org/photos/89461901/medium.jpg'
      },
    ]);
  });
  it('#GET snails/:id should return a single snail', async () => {
    const resp = await request(app).get('/snails/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Eastern Heath Snail',
      scientific_name: 'Xerolenta obvia',
      image: 'https://inaturalist-open-data.s3.amazonaws.com/photos/220049212/original.jpeg',
    });
  });
  it('#POST /snails should create a new snail', async () => {
    const newSnail = {
      name: 'Slimy Boy',
      scientific_name: 'Slimiest Snailiest',
      image: 'https://static.wikia.nocookie.net/astroneer_gamepedia/images/1/18/Sylvie.png/revision/latest?cb=20220113110701',
    };
    const resp = await request(app).post('/snails').send(newSnail);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newSnail,
    });
  });
  it('#PUT /snails/:id should update an existing snail', async () => {
    const resp = await request(app).put('/snails/1').send({
      name: 'So Slimy',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('So Slimy');
  });
  afterAll(() => {
    pool.end();
  });
});
