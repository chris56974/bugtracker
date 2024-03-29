import type { TicketPriority, TicketType, TicketStatus } from '../models/Ticket'
import type { ITicketRepository } from '../repositories'
import { changeKeysFromSnakeToCamel } from '../utility/snakeToCamel'

export class ActivityService {
  #ticketDb: ITicketRepository

  constructor(ticketDb: ITicketRepository) {
    this.#ticketDb = ticketDb 
  }

  async getUserActivity(userId: string) { 
    const ticketStatistics: {
      priority: Record<TicketPriority, number>,
      type: Record<TicketType, number>,
      status: Record<TicketStatus, number>,
      project: Record<string, number>
    } = {
      priority: {
        none: 0,
        low: 0,
        medium: 0,
        high: 0,
        critical: 0
      },
      type: {
        bug: 0,
        feature_request: 0,
        task: 0,
        documentation: 0,
        improvement: 0,
        question: 0
      },
      status: {
        open: 0,
        in_progress: 0,
        closed: 0,
        additional_info_required: 0
      },
      project: {} 
    }

    const tickets = await this.#ticketDb.getUserAssignedTicketStatistics(userId) 

    for (const ticket of tickets) {
      ticketStatistics.priority[ticket.priority]++
      ticketStatistics.type[ticket.type]++
      ticketStatistics.status[ticket.status]++
      ticketStatistics.project[ticket.projectName]++
    }

    return changeKeysFromSnakeToCamel(ticketStatistics)
  }
}
