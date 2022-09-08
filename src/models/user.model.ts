import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IUser } from '../types/types'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: { type: String, required: true },
    hash: String,
  },
  { timestamps: true }
)

userSchema.plugin(uniqueValidator)

const User = model<IUser>('User', userSchema)

export default User
