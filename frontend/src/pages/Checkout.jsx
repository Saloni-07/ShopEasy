import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Truck, CreditCard, Smartphone, Landmark } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.js";

const paymentOptions = [
  { id: "COD", label: "Cash on Delivery", icon: Truck },
  { id: "Card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "UPI", label: "UPI", icon: Smartphone },
  { id: "NetBanking", label: "Net Banking", icon: Landmark },
];

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setPlacing(true);
    try {
      const items = cart.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));

      const { data } = await api.post("/orders", {
        items,
        shippingAddress: address,
        paymentMethod,
        totalPrice: cartTotal,
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                name="fullName"
                value={address.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="input-field"
              />
              <input
                required
                name="phone"
                value={address.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-field"
              />
              <input
                required
                name="address"
                value={address.address}
                onChange={handleChange}
                placeholder="Address"
                className="input-field sm:col-span-2"
              />
              <input
                required
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="City"
                className="input-field"
              />
              <input
                required
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="input-field"
              />
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Payment Method</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {paymentOptions.map(({ id, label, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                    paymentMethod === id ? "border-primary bg-indigo-50" : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                    className="accent-primary"
                  />
                  <Icon size={20} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
            {paymentMethod !== "COD" && (
              <p className="text-xs text-gray-500 mt-3">
                This is a demo payment method — no real payment is processed.
              </p>
            )}
          </div>
        </div>

        <div className="card p-6 h-fit">
          <h2 className="font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product._id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate pr-2">
                  {item.product.name} × {item.quantity}
                </span>
                <span>₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <button type="submit" disabled={placing} className="btn-primary w-full">
            {placing ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
