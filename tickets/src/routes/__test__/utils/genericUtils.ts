import mongoose from 'mongoose';

export const getRandomIdHexString = (): String =>
  new mongoose.Types.ObjectId().toHexString();
