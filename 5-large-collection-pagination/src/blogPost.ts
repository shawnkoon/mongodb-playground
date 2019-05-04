// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface BlogPostProps extends mongoose.Document {
  title: string;
  content: string;
  comments: string[];
}

const blogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});

const blogPost = mongoose.model<BlogPostProps>('blogpost', blogPostSchema);

export default blogPost;
