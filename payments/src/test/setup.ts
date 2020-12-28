import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

require('dotenv').config();

declare global {
  namespace NodeJS {
    interface Global {
      signin(userId?: string): string[];
    }
  }
}

process.env.STRIPE_KEY =
  'sk_test_51I0MbfC2cA9gZexrNtEYOJ18CnmRvA3UHIixgyto9mw0rctGjlNQrLor9QMfNxv5SHkAFrR6WplY0caFPMezbsFt00k9dEZgSx';
jest.mock('../nats-wrapper.ts');

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (userId?: string) => {
  // Build a JWT payload. { id, email }
  const id = userId || mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`]; // using array for supertest
};
