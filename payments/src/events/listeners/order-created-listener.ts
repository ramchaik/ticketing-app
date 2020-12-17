import { Listener, OrderCreatedEvent, Subjects } from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const {
      id,
      ticket: { price },
      status,
      userId,
      version,
    } = data || {};

    const order = Order.build({
      id,
      price,
      status,
      userId,
      version,
    });
    await order.save();

    msg.ack();
  }
}
