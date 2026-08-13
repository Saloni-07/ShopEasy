import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import api from "../api/axios.js";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(({ data }) => setOrder(data));
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
      <p className="text-gray-600 mt-2">
        Thank you for shopping with ShopEasy. Your order is being processed.
      </p>

      {order && (
        <div className="card p-6 mt-8 text-left">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="font-mono text-gray-800 mb-4">{order._id}</p>
          <p className="text-sm text-gray-500 mb-1">Payment Method</p>
          <p className="text-gray-800 mb-4">{order.paymentMethod}</p>
          <p className="text-sm text-gray-500 mb-1">Total Amount</p>
          <p className="text-gray-800 font-bold text-lg">₹{order.totalPrice}</p>
        </div>
      )}

      <Link to="/" className="btn-primary inline-block mt-8">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
