// Lib
import assert from 'assert';
import mongoose from 'mongoose';

// App
import User, { UserProps } from '../src/user';
import BlogPost, { BlogPostProps } from '../src/blogPost';
import Comment, { CommentProps } from '../src/comment';

describe('Association test', () => {
  let shawnkoon: UserProps;
  let blogPost: BlogPostProps;
  let comment: CommentProps;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon' });
    blogPost = new BlogPost({ title: 'MongoDB-Playground', content: 'With TypeScript!' });
    comment = new Comment({ content: 'Ha, nice try!' });

    shawnkoon.blogPosts.push(blogPost._id);
    blogPost.comments.push(comment._id);
    comment.user = shawnkoon._id;

    await shawnkoon.save();
    await blogPost.save();
    await comment.save();
  });

  it('should have saved a relation between a user and a blogpost', async () => {
    const user = await User.findOne({ name: 'shawnkoon' }).populate('blogPosts');

    if (!user) {
      throw new Error('User could not be found');
    }

    // @ts-ignore -- Please investigate this
    assert.equal(user.blogPosts[0].title, 'MongoDB-Playground');
  });

  it('should have saved a full relation graph', async () => {
    const user = await User.findOne({ name: 'shawnkoon' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user',
        },
      },
    });

    if (!user) {
      throw new Error('User could not be found');
    }

    // @ts-ignore
    assert.equal(user.blogPosts[0].title, 'MongoDB-Playground');
    // @ts-ignore
    assert.equal(user.blogPosts[0].comments[0].content, 'Ha, nice try!');
    // @ts-ignore
    assert.equal(user.blogPosts[0].comments[0].user.name, 'shawnkoon');
  });
});
