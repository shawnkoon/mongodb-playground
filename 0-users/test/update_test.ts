// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Update User records', () => {
  let shawnkoon: UserProps;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon' });
    await shawnkoon.save();
  });

  afterEach(async () => {
    // Fetch all records.
    const updated = await User.find({});

    assert(updated.length === 1, 'length should be 1');
    assert(updated[0]._id.toString() === shawnkoon._id.toString(), 'id should be same');
    assert(updated[0].name !== 'shawnkoon', 'name should be different');
  });

  it('Update using instance based set n save', async () => {
    shawnkoon.set('name', 'yee');
    await shawnkoon.save();
  });

  it('Update using instance based update', async () => {
    await shawnkoon.update({ name: 'yee' });
  });

  it('Update using class based update', async () => {
    // Updates all records.
    await User.update({ name: 'shawnkoon' }, { name: 'New Name' });
  });

  it('Update using class based findOneAndUpdate', async () => {
    await User.findOneAndUpdate({ name: 'shawnkoon' }, { name: 'New Name' });
  });

  it('Update using class based findByIdAndUpdate', async () => {
    await User.findByIdAndUpdate(shawnkoon._id, { name: 'New Name' });
  });
});
