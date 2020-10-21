import { Listner, Subjects, TicketCreatedEvent } from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListner extends Listner<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`Event Data:`, data);

    msg.ack();
  }
}
