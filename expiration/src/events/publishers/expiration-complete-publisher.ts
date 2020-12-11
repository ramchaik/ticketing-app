import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@vsrtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
