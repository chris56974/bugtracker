import { faker } from '@faker-js/faker'
import request from 'supertest'
import { Roles } from '../../../types'
import { createTestUser, closeDbConnections } from '../../helper'
import app from '../../../config/server'

afterAll(async () => {
  await closeDbConnections()
})

describe('User sign up routes', () => {
  describe('POST /users', () => {
    it('should 201 with data on signup', async () => {
      const email    = faker.internet.email()
      const username = faker.internet.userName()
      const password = faker.internet.password()
      const role     = 'contributor' as Roles

      const res = await request(app)
        .post('/users')
        .send({ 
          email,
          username,
          password,
        })

      expect(res).toMatchObject({ 
        status: 201, 
        body: {
          user: { 
            id: expect.any(Number), 
            email, 
            username, 
            role, 
          } 
        } 
      })
    })

    it('should 400 when something is missing', async () => {
      await request(app)
        .post('/users')
        .send({ 
          email: faker.internet.email(), 
          username: faker.internet.userName() 
        })
        .expect(400)
    })

    it('should 400 when email is invalid', async () => {
      await request(app)
        .post('/users')
        .send({ 
          email: 'jeff', 
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .expect(400)
    })

    it('should 409 when email already exists', async () => {
      const currentUser = await createTestUser('contributor')

      await request(app)
        .post('/users')
        .send({ 
          email: currentUser.email, 
          username: faker.internet.userName(), 
          password: faker.internet.password() 
        })
        .expect(409)
    })

    it('should 409 when username already exists', async () => {
      const currentUser = await createTestUser('contributor')

      await request(app)
        .post('/users')
        .send({ 
          email: faker.internet.email(), 
          username: currentUser.username, 
          password: faker.internet.password() 
        })
        .expect(409)
    })
  })
})