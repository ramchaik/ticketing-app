import { Message } from 'node-nats-streaming';
import { Listner } from './base-listner';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message) {
    console.log(`Event Data:`, data);

    msg.ack();
  }
}
