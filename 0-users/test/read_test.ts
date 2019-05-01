// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Read User out of MongoDB', () => {
  let shawnkoon: UserProps;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon' });
    await shawnkoon.save();
  });

  it('finds all users with a name', async () => {
    const users = await User.find({ name: 'shawnkoon' });

    assert(users[0]._id.toString() === shawnkoon._id.toString());
  });

  it('find a user with particular id', async () => {
    const user = await User.findOne({ _id: shawnkoon._id });

    assert(user!.name === 'shawnkoon');
  });
});
