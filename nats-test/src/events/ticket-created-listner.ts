import { Message } from 'node-nats-streaming';
import { Listner } from './base-listner';

export class TicketCreatedListner extends Listner {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, msg: Message) {
    console.log(`Event Data:`, data);

    msg.ack();
  }
}
