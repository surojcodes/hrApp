import request from 'supertest';
import app from '../app';

export const signIn = async () => {
  const userData = {
    eid: '1',
    name: 'Samuel Jackson',
    email: 'test@jest.com',
    password: 'password',
    passwordConfirmation: 'password',
  };

  const response = await request(app)
    .post('/api/auth/register')
    .send(userData)
    .expect(201);
  const cookie = response.get('Set-Cookie');
  return cookie;
};
