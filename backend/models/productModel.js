import mongoose from "mongoose";

const produnctSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imageURL: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", produnctSchema);

export default Product;
