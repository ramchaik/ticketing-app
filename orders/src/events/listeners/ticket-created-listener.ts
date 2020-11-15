import { Message } from 'node-nats-streaming';
import { Subjects, Listner, TicketCreatedEvent } from '@vsrtickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    try {
      const ticket = Ticket.build({
        id,
        title,
        price,
      });

      await ticket.save();

      msg.ack();
    } catch (error) {
      console.error(error);
    }
  }
}
