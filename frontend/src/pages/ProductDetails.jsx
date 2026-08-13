import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        const relatedRes = await api.get(`/products/${id}/related`);
        setRelated(relatedRes.data);
        setQuantity(1);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    const result = await addToCart(product._id, quantity);
    if (result.requiresLogin) {
      navigate("/login");
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-primary mb-6 text-sm"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
        </div>

        <div>
          <span className="text-primary text-sm font-medium">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-gray-700">{product.rating} rating</span>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <div className="mt-6 text-3xl font-bold text-gray-900">₹{product.price}</div>
          <p className="text-sm text-gray-500 mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"} • Brand: {product.brand}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-gray-600 hover:text-primary"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-gray-600 hover:text-primary"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-gray-800 mb-5">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
