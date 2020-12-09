import { OrderCreatedEvent, OrderStatus, Subjects } from '@vsrtickets/common';
import { OrderCreatedListner } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  /**
   * To Do:
   *  - Create the instance of the listner
   *  - Create and save a ticket
   *  - Create the fake data event
   *  - Create the fake msg object
   */

  const listner = new OrderCreatedListner(natsWrapper.client);

  const ticket = Ticket.build({
    title: 'concert',
    price: 30,
    userId: 'abc',
  });

  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'abc',
    expiresAt: 'abkc',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return {
    listner,
    ticket,
    data,
    msg,
  };
};

it('sets the orderId of the ticket', async () => {
  const { listner, ticket, data, msg } = await setup();

  await listner.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listner, data, msg } = await setup();

  await listner.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket created event', async () => {
  const { listner, data, msg } = await setup();

  await listner.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
