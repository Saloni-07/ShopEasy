import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, default: "Generic" },
    image: { type: String, required: true },
    stock: { type: Number, default: 50 },
    rating: { type: Number, default: 4 },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", category: "text", brand: "text" });

export default mongoose.model("Product", productSchema);
