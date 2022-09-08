import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { IUser } from '../types/types'

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

const User = model<IUser>('User', userSchema)

export default User
