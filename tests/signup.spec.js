import supertest from 'supertest'
import { mongoose } from '../config/database'
import server from '../config/server'

afterAll(done => mongoose.disconnect(done))

describe('POST /api/auth/signup', () => {
  const request = supertest(server)
  const signupRoute = '/api/auth/signup'
  const name = 'Chris'
  const email = 'tmp@mail.com'
  const password = 'azer1234'

  it('should NOT signup without required `name` field', () => {
    return request
      .post(signupRoute)
      .send({ email, password })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: name: Path `name` is required.'
      })
  })

  it('should NOT signup without required `email` field', () => {
    return request
      .post(signupRoute)
      .send({ name, password })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: email: Path `email` is required.'
      })
  })

  it('should NOT signup without required `password` field', () => {
    return request
      .post(signupRoute)
      .send({ name, email })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: password: Path `password` is required.'
      })
  })

  it('should NOT signup with incorrect `email` field', () => {
    return request
      .post(signupRoute)
      .send({ name, email: 'tmpmail.com', password })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: email: Email invalide'
      })
  })

  it('should signup correctly', () => {
    return request
      .post(signupRoute)
      .send({ name, email, password })
      .expect('Content-Type', /json/)
      .expect(201, { status: 201, message: 'Ok' })
  })

  it('should NOT signup with identical email', () => {
    return request
      .post(signupRoute)
      .send({ name, email, password })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error:
          'User validation failed: email: Error, expected `email` to be unique. Value: `tmp@mail.com`'
      })
      .then(() => {
        return request
          .post('/api/auth/login')
          .send({ email, password })
          .expect(200)
          .then(({ body }) => {
            return request
              .delete(`/api/users/${body.userId}`)
              .set('Authorization', `bearer ${body.token}`)
              .expect(200)
          })
      })
  })
})
