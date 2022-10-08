import { Schema, model } from 'mongoose';
import { IProduct } from '../types/types';

const ProductSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    isShirt: { type: Boolean, required: true },
    isJean: { type: Boolean, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;
