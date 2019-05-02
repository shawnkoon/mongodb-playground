// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Virtual Types Test', () => {
  it('postCount returns number of posts', async () => {
    const shawnkoon = new User({
      name: 'shawnkoon',
      posts: [{ title: 'FirstPost' }],
    });
    await shawnkoon.save();

    const user = await User.findOne({ name: 'shawnkoon' });

    if (!user) {
      throw new Error(`User could not be found.`);
    }

    assert.equal(user.postCount, 1);
  });
});
