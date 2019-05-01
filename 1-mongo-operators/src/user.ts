// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface UserProps extends mongoose.Document {
  name: string;
  postCount: number;
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
  postCount: Number,
});

const User = mongoose.model<UserProps>('user', UserSchema);

export default User;
