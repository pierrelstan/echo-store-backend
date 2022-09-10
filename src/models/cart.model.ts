import { Schema, model } from 'mongoose'
import { ICart } from '../types/types'

const cartSchema = new Schema<ICart>({
  userId: { type: String, require: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
  isAddedToCart: { type: Boolean, require: true },
})

const Cart = model<ICart>('Cart', cartSchema)
export default Cart
