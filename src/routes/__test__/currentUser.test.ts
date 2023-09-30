import request from 'supertest';
import app from '../../app';
import { signIn } from '../../test/sigin';

describe('Current User test', () => {
  it('responds with error if not logged in', async () => {
    await request(app).get('/api/auth/currentUser').expect(403);
  });
  it('responds with details about the current user', async () => {
    const cookie = await signIn();
    const res = await request(app)
      .get('/api/auth/currentUser')
      .set('Cookie', cookie)
      .send()
      .expect(200);
    expect(res.body.data.email).toEqual('test@jest.com');
  });
});
