import { Message } from 'node-nats-streaming';
import { Subjects, Listner, TicketUpdatedEvent } from '@vsrtickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListner extends Listner<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.id);

    if (!ticket) throw new Error('Ticket not found');

    const { price, title } = data;
    ticket.set({
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
