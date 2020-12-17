import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@vsrtickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';
import { queueGroupName } from './queue-group-name';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findByIdAndVersion(data.id, data.version);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.Cancelled) {
      order.set({
        status: OrderStatus.Cancelled,
      });
      await order.save();
    }

    msg.ack();
  }
}
