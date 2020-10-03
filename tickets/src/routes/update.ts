import express, { Request, Response } from 'express';
import { Ticket } from '../models/tickets';
import { body } from 'express-validator';
import {
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
  validateRequest,
} from '@vsrtickets/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id).exec();

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
