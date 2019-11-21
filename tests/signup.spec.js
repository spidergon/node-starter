import supertest from 'supertest'
import { mongoose } from '../config/database'
import server from '../config/server'

const request = supertest(server)
const email = 'tmp@mail.com'

afterAll(done => mongoose.disconnect(done))

describe('POST /api/auth/signup', () => {
  it('should NOT signup without required `name` field', () => {
    return request
      .post('/api/auth/signup')
      .send({ email, password: 'azer1234' })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: name: Path `name` is required.'
      })
  })

  it('should NOT signup without required `email` field', () => {
    return request
      .post('/api/auth/signup')
      .send({ name: 'Chris', password: 'azer1234' })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: email: Path `email` is required.'
      })
  })

  it('should NOT signup without required `password` field', () => {
    return request
      .post('/api/auth/signup')
      .send({ name: 'Chris', email })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: password: Path `password` is required.'
      })
  })

  it('should NOT signup with incorrect `email` field', () => {
    return request
      .post('/api/auth/signup')
      .send({ name: 'Chris', email: 'tmpmail.com', password: 'azer1234' })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error: 'User validation failed: email: Email invalide'
      })
  })

  it('should signup correctly', () => {
    return request
      .post('/api/auth/signup')
      .send({ name: 'Chris', email, password: 'azer1234' })
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should NOT signup with identical email', () => {
    return request
      .post('/api/auth/signup')
      .send({ name: 'Chris', email, password: 'azer1234' })
      .expect('Content-Type', /json/)
      .expect(500, {
        status: 500,
        error:
          'User validation failed: email: Error, expected `email` to be unique. Value: `tmp@mail.com`'
      })
      .then(() => {
        return request
          .post('/api/auth/login')
          .send({ email, password: 'azer1234' })
          .expect(200)
          .then(res => {
            return request
              .delete(`/api/users/${res.body.userId}`)
              .set('Authorization', `bearer ${res.body.token}`)
              .expect(200)
          })
      })
  })
})
