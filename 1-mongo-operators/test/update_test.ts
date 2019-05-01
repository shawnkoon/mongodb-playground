// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Update User records', () => {
  let shawnkoon: UserProps;
  const incrementValue = 3;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon', postCount: 0 });
    await shawnkoon.save();
  });

  afterEach(async () => {
    // Fetch all records.
    const updated = await User.find({});

    assert.equal(updated.length, 1, 'length should be 1');
    assert.equal(
      updated[0]._id.toString(),
      shawnkoon._id.toString(),
      'id should be same'
    );
    assert.equal(
      updated[0].postCount,
      incrementValue,
      `postCount now should be ${incrementValue}`
    );
  });

  it(`Set shawnkoon users' postCount incremented by ${incrementValue}`, async () => {
    await User.update({ name: 'shawnkoon' }, { $inc: { postCount: incrementValue } });
  });
});
