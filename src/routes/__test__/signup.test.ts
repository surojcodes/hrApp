import request from 'supertest';
import app from '../../app';

describe('Sign Up Tests', () => {
  it('returns a 400 on required error', async () => {
    const userData = {
      eid: '1',
      name: 'Samuel Jackson',
    };
    await request(app).post('/api/auth/register').send(userData).expect(400);
  });

  it('does password confirmation check', async () => {
    const userData = {
      eid: '101',
      name: 'Samuel Jackson',
      email: 'test@jest.com',
      password: 'password',
      passwordConfirmation: 'password24',
    };
    await request(app).post('/api/auth/register').send(userData).expect(400);
  });
  it('returns a 201 on successful signin', async () => {
    const userData = {
      eid: '101',
      name: 'Samuel Jackson',
      email: 'test@jest.com',
      password: 'password',
      passwordConfirmation: 'password',
    };
    await request(app).post('/api/auth/register').send(userData).expect(201);
  });
  it('doesnot allow duplicate email', async () => {
    const userData = {
      eid: '101',
      name: 'Samuel Jackson',
      email: 'test@jest.com',
      password: 'password',
      passwordConfirmation: 'password',
    };
    await request(app).post('/api/auth/register').send(userData).expect(201);
    await request(app).post('/api/auth/register').send(userData).expect(400);
  });
});
