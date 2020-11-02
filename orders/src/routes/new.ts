import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from '@vsrtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure the ticket is not already reserved
    const isResvered = await ticket.isReserved();
    if (isResvered) {
      throw new BadRequestError('Ticket is already reserved');
    }


    // Calculate the expiration date for this order

    // Build the order and save it to database

    // Publish the event saying the event was created

    res.send({});
  }
);

export { router as newOrderRouter };
