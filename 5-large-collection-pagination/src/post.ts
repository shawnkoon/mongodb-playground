// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface PostProps {
  title: string;
}

const postSchema = new Schema({
  title: String,
});

export default postSchema;
