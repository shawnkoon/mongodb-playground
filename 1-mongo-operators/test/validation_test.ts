// Lib
import assert from 'assert';
import { Error } from 'mongoose';

// App
import User, { UserProps } from '../src/user';

describe('Record Validation test', () => {
  it('should require a name', async () => {
    const user = new User({ name: undefined });
    let message: any = '';

    try {
      await user.validate();
    } catch (e) {
      const caught: Error.ValidationError = e;
      message = caught.errors.name.message;
    }
    assert.equal(message, 'Name is required.');
  });

  it('should require name be more than 2 character', async () => {
    const user = new User({ name: 'Hi' });
    let message: any = '';

    try {
      await user.validate();
    } catch (e) {
      const caught: Error.ValidationError = e;
      message = caught.errors.name.message;
    }
    assert.equal(message, 'Name must be longer than 2 characters.');
  });

  it('should disallow invalid record from being saved', async () => {
    const user = new User({ name: 'hi' });
    let message: any = '';

    try {
      await user.save();
    } catch (e) {
      const caught: Error.ValidationError = e;
      message = caught.errors.name.message;
    }

    assert.equal(message, 'Name must be longer than 2 characters.');
  });
});
