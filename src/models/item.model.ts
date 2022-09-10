import { Schema, model } from 'mongoose'
import { IItem } from '../types/types'

const itemSchema = new Schema<IItem>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  isShirt: { type: Boolean, required: true },
  isJean: { type: Boolean, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

const Item = model<IItem>('Item', itemSchema)

export default Item
