import { Listener, OrderCreatedEvent, Subjects } from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, expiresAt } = data;
    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        orderId: id,
      },
      { delay }
    );

    msg.ack();
  }
}
