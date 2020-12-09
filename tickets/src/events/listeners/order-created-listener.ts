import { Listener, OrderCreatedEvent, Subjects } from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    /**
     *
     * To Do:
     *  - Find the ticket that the order is reserving
     *  - If no ticket, throw error
     *  - Mark the ticket as being reserved by setting it's orderId property
     *  - Save the ticket
     *  - Publish the ticket updated event
     *  - Ack the message
     *
     */

    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({
      orderId: data.id,
    });

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
