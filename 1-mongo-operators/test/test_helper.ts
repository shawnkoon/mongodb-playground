// Lib
import mongoose from 'mongoose';

before(async () => {
  await mongoose.connect('mongodb://localhost:27017/users_test', {
    useNewUrlParser: true,
  });

  await mongoose.connection
    .once('open', () => {})
    .on('error', error => console.warn('>>> Warning', error));
});

beforeEach(async () => {
  try {
    await mongoose.connection.collections['users'].drop();
  } catch (ex) {
    console.error(">>> Attempted to drop a collection which doesn't exist.");
  }
});
