import request from 'supertest';
import app from '../src/app.js';

describe('Health', () => {
  it('GET / should respond ok', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
