import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={56} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add some products to see them here.</p>
        <Link to="/" className="btn-primary inline-block mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product._id} className="card flex items-center gap-4 p-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                <p className="text-primary font-semibold mt-1">₹{item.product.price}</p>
              </div>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:text-primary"
                >
                  −
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:text-primary"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-4">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <button onClick={() => navigate("/checkout")} className="btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
