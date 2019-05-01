// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Deleting users', () => {
  let shawnkoon: UserProps;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon' });
    await shawnkoon.save();
  });

  afterEach(async () => {
    const check = await User.find({ _id: shawnkoon._id });

    assert(check.length === 0);
  });

  it('model instance remove', async () => {
    await shawnkoon.remove();
  });

  it('class method remove', async () => {
    // deprecated
    // await User.remove({ name: 'shawnkoon' });

    await User.deleteOne({ name: 'shawnkoon' });
  });

  it('class method findAndRemove', async () => {
    await User.findOneAndRemove({ name: 'shawnkoon' });
  });

  it('class method findByIdAndRemove', async () => {
    await User.findByIdAndRemove(shawnkoon._id);
  });
});
