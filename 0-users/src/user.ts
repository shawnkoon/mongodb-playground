// Lib
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface UserProps extends mongoose.Document {
  name: string;
}

const UserSchema = new Schema({
  name: String
});

const User = mongoose.model<UserProps>('user', UserSchema);

export default User;
