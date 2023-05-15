import { faker } from '@faker-js/faker'
import { 
  TestTicket, addUserToTickets, createPmAndProjectWithTickets, 
  createTestUser, testPaginationRoutes, TestUser, closeDbConnections
} from '../../../helper'

afterAll(async () => {
  await closeDbConnections()
})

describe('User route for checking all the tickets they\'re assigned to', () => {
  let dev: TestUser
  let tickets: TestTicket[]
  const description = faker.random.words(20)

  beforeAll(async () => {
    ({ tickets } = await createPmAndProjectWithTickets(20))
    dev = await createTestUser('developer')
    await addUserToTickets(dev.id, tickets)
  })

  describe('GET /admin/tickets', () => {
    testPaginationRoutes(dev.agent, '/admin/tickets', 'tickets')
  })

  describe('GET /admin/tickets?search=', () => {
    testPaginationRoutes(dev.agent, '/admin/tickets', 'tickets', { search: description })
  })
})