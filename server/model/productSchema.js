import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const productSchema = new mongoose.Schema({
  id: String,
  url: String,
  detailUrl: String,
  title: Object,
  price: Object,
  quantity: Number,
  category: String,
  subCategory: String,
  productType: String,
  description: String,
  noPurchases: Number,
  discount: Number,
  tagline: String,
});

autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, "product");

const products = mongoose.model("product", productSchema);

export default products;
