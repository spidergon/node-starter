import request from 'supertest'
import server from '../config/server'
import { mongoose } from '../config/database'

describe('Get /api/posts', () => {
  afterEach(done => mongoose.disconnect(done))

  it('responds with json', async () => {
    return request(server)
      .get('/api/posts')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
