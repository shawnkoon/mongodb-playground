// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';

describe('Sub Document tests', () => {
  let shawnkoon: UserProps;

  it('should be able to create a sub-document.', async () => {
    shawnkoon = new User({
      name: 'shawnkoon',
      postCount: 1,
      posts: [{ title: 'FirstPost' }],
    });

    await shawnkoon.save();

    let postTitle = '';
    try {
      const user = await User.findOne({ name: 'shawnkoon' });
      postTitle = user!.posts[0].title;
    } catch (e) {
      throw new Error(`>>> Failed to find a user : ${e.message}`);
    }
    assert.equal(postTitle, 'FirstPost');
  });

  it('should be able to add sub-document to existing user.', async () => {
    shawnkoon = new User({
      name: 'shawnkoon',
      posts: [],
    });

    await shawnkoon.save();

    // Get a user and add a new post.
    let user = await User.findOne({ name: 'shawnkoon' });

    if (!user) {
      throw new Error('Failed to find a user.');
    }
    user.posts.push({ title: 'NewPost' });
    await user.save();

    // Get a user and assert for new post.
    user = await User.findOne({ name: 'shawnkoon' });

    if (!user) {
      throw new Error('Failed to find a user.');
    }
    assert.equal(user.posts[0].title, 'NewPost');
  });

  it('should be able to remove sub-document', async () => {
    shawnkoon = new User({
      name: 'shawnkoon',
      posts: [{ title: 'FirstPost' }],
    });

    await shawnkoon.save();

    // Get a user and remove a post.
    let user = await User.findOne({ name: 'shawnkoon' });

    if (!user) {
      throw new Error('Failed to find a user.');
    }
    user.posts.splice(0, 1);
    await user.save();

    // Get a user and assert removed post.
    user = await User.findOne({ name: 'shawnkoon' });

    if (!user) {
      throw new Error('Failed to find a user.');
    }
    assert.equal(user.posts.length, 0);
  });
});
