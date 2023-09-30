import request from 'supertest';
import app from '../../app';

describe('SignOut Test', () => {
  it('clears cookies after signing out', async () => {
    const userData = {
      eid: '101',
      name: 'Samuel Jackson',
      email: 'test@jest.com',
      password: 'password',
      passwordConfirmation: 'password',
    };
    let response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);
    const cookie = response.get('Set-Cookie');
    response = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', cookie)
      .send()
      .expect(200);
  });
});
