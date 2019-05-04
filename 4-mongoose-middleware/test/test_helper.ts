// Lib
import mongoose = require('mongoose');

// App
import User from '../src/user';
import BlogPost from '../src/blogPost';
import Comment from '../src/comment';

before(() => {
  console.log('>>> Connecting to a DB');
  mongoose.connect('mongodb://localhost:27017/users_test', {
    useNewUrlParser: true,
  });

  mongoose.connection
    .on('error', error => console.warn('>>> Warning', error))
    .once('open', () => console.log('>>> Connected!'));

  console.log('>>> Finished Connecting to a DB');
});

beforeEach(async () => {
  console.log('>>> Cleaning collections');
  try {
    await User.remove({});
    await BlogPost.remove({});
    await Comment.remove({});
  } catch (e) {
    console.error(`>>> Attempted to drop a collection which doesn't exist`, e);
  }
  console.log('>>> Finished Cleaning collections');
});
