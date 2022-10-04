import { Schema, model } from "mongoose";
import { IProduct } from "../types/types";

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
