// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface CommentProps extends mongoose.Document {
  content: string;
  user: string;
}

const commentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
});

const comment = mongoose.model<CommentProps>('comment', commentSchema);

export default comment;
