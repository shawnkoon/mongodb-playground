// Lib
import assert from 'assert';

// App
import User from '../src/user';

describe('Creating records', () => {
  it('Saves a user', async () => {
    const shawnkoon = new User({ name: 'shawnkoon' });

    try {
      await shawnkoon.save();
    } catch (e) {
      console.log('Failed', e);
    }
    assert(!shawnkoon.isNew);
  });
});
