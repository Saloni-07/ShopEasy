import Order from "../models/Order.js";
import User from "../models/User.js";

// @route POST /api/orders  (protected)
// body: { items, shippingAddress, paymentMethod, totalPrice }
export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid: paymentMethod !== "COD", // mock: mark paid instantly unless Cash on Delivery
    });

    // clear the user's cart after order is placed
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/orders/my  (protected)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/orders/:id  (protected)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
