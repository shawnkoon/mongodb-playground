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

UserSchema.virtual('postCount').get(function(this: UserProps) {
  return this.posts.length;
});

const User = mongoose.model<UserProps>('user', UserSchema);

export default User;
