// Lib
import assert from 'assert';

// App
import User, { UserProps } from '../src/user';
import BlogPost, { BlogPostProps } from '../src/blogPost';

describe('Mongoose Middleware test', () => {
  let shawnkoon: UserProps;
  let blogPosts: BlogPostProps[] = [];
  const count = 2;

  beforeEach(async () => {
    shawnkoon = new User({ name: 'shawnkoon' });

    await BlogPost.insertMany(
      [
        { title: 'MongoDB 101', content: 'hello' },
        { title: 'TypeScript 101', content: '222' },
        { title: 'Mocha 101', content: 'coffee' },
      ],
      (_err: any, docs: BlogPostProps[]) => {
        docs.forEach((doc: BlogPostProps, index: number) => {
          if (index < count) {
            // associate only '{count} out of 3' blogPosts.
            shawnkoon.blogPosts.push(docs[index]._id);
          }
          blogPosts.push(doc);
        });
      }
    );

    await shawnkoon.save();
  });

  it('should remove blogPosts on user remove', async () => {
    await shawnkoon.remove();
    const blogPostCount = await BlogPost.countDocuments();
    assert.equal(
      blogPostCount,
      blogPosts.length - count,
      `After an User deletion, there should be ${blogPosts.length -
        count} BlogPosts left over.`
    );
  });
});
