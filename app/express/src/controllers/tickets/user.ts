import type { NextFunction, Request, Response } from 'express'
import { TicketUserService } from '../../services/tickets'

// GET /projects/:projectId/tickets/:ticketId/users
export async function getTicketUsers(req: Request, res: Response, next: NextFunction) {
  const projectId = req.params.projectId
  const ticketId = req.params.ticketId

  try {
    const users = await TicketUserService.getTicketUsers(projectId, ticketId)
    res.status(200).send(users)
  } catch (error) {
    return next(error) 
  } 
}

// POST /projects/:projectId/tickets/:ticketId/users
export async function addUserToTicket(req: Request, res: Response, next: NextFunction) {
  const projectId = req.params.projectId
  const ticketId = req.params.ticketId
  const userId = req.session.userId as string

  try {
    await TicketUserService.addUserToTicket(projectId, ticketId, userId)
    res.status(201).send()
  } catch (error) {
    return next(error) 
  }
}

// DELETE /projects/:projectId/tickets/:ticketId/users/:userId
export async function removeUserFromTicket(req: Request, res: Response, next: NextFunction) {
  const projectId = req.params.projectId
  const ticketId = req.params.ticketId
  const userId = req.session.userId as string

  try {
    await TicketUserService.removeUserFromTicket(projectId, ticketId, userId)
    res.status(201).send()
  } catch (error) {
    return next(error) 
  }
}
