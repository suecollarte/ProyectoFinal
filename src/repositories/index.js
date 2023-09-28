import {UserDao, TicketDao} from '../services/factory.js'

import UserRepository from './user.repository.js'
import TicketRepository from './ticket.repository.js'
export const UserService =new UserRepository(new UserDao())
export const TicketService = new TicketRepository(new TicketDao())

//hace uso del servicio el controller