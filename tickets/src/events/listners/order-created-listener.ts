import { Listner, OrderCreatedEvent, Subjects } from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListner extends Listner<OrderCreatedEvent> {
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

    msg.ack();
  }
}
