import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
