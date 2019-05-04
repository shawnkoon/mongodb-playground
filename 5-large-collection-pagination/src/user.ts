// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

// App
import PostSchema, { PostProps } from './post';

export interface UserProps extends mongoose.Document {
  name: string;
  blogPosts: string[];
  postCount: number;
  posts: PostProps[];
  likes: number;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name: string) => name.length > 2,
      message: 'Name must be longer than 2 characters.',
    },
  },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogpost' }],
  likes: Number,
  posts: [PostSchema],
});

// Create virtual type.
UserSchema.virtual('postCount').get(function(this: UserProps) {
  return this.posts.length;
});

// Create pre-remove middleware hook.
UserSchema.pre('remove', async function(this: UserProps) {
  const BlogPost = mongoose.model('blogpost'); // Avoid cyclic imports.

  await BlogPost.remove({ _id: { $in: this.blogPosts } });
});

const User = mongoose.model<UserProps>('user', UserSchema);

export default User;
