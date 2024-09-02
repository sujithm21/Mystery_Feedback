import mongoose, { Schema, Document } from "mongoose";

//we extend the typescript schema to mongoose doc since the schema is mongoose itself
export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}

// also using type script gives type safety

const MessageSchema: Schema<IMessage> = new Schema({
  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  verifycode: string;
  verifycodeexpiry: Date;
  isVerified: boolean;
  isAcceptingMsg: boolean;
  messages: IMessage[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: [true, "Username is requierd"],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Please enter a valid email address.",
    ],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  verifycode: {
    type: String,
    required: [true, "verifycode is required"],
  },

  verifycodeexpiry: {
    type: Date,
    required: [true, "verifycodeexpiry is required"],
  },

  isVerified: {
    type: Boolean,
    defalut: false,
  },

  isAcceptingMsg: {
    type: Boolean,
    defalut: true,
  },

  messages: [MessageSchema],
});

// we don't export the schema like normal in nextjs it runs on edge server so it doesn't know ki
// the schema is running for the first time or it is already there so we check both cases
// case1 : if schema is already run
// case2 : if schema is running for the first time then create the fields in db and return

const UserModel =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default UserModel;
