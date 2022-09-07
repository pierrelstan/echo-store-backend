import { Schema, model } from 'mongoose'
import { IItem } from '../types/types'

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  isShirt: { type: Boolean, required: true },
  isJean: { type: Boolean, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
})

const Item = model<IItem>('Item', itemSchema)

export default Item
