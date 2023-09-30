import request from 'supertest';
import app from '../../app';

describe('Log In Tests', () => {
  it('required both email and password to login', async () => {
    const user = {
      email: 'doesnotexist@gmail.com',
    };
    await request(app).post('/api/auth/login').send(user).expect(400);
  });

  it('fails for unregistered email', async () => {
    const user = {
      email: 'doesnotexist@gmail.com',
      password: 'doesnotmatter',
    };
    await request(app).post('/api/auth/login').send(user).expect(400);
  });

  it('fails when incorrect password is supplied', async () => {
    const user = {
      eid: '2',
      name: 'Jane Doe',
      email: 'janed@gmail.com',
      password: 'appleApple',
      passwordConfirmation: 'appleApple',
    };
    await request(app).post('/api/auth/register').send(user).expect(201);
    await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: 'incorrectPassword' })
      .expect(400);
  });

  it('responds with a cookie for valid credentials', async () => {
    const user = {
      eid: '2',
      name: 'Jane Doe',
      email: 'janed@gmail.com',
      password: 'appleApple',
      passwordConfirmation: 'appleApple',
    };
    await request(app).post('/api/auth/register').send(user).expect(201);
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
    // console.log(res.get('Set-Cookie')); //array
    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
