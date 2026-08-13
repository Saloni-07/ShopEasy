import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await addToCart(product._id, 1);
    if (result.requiresLogin) {
      navigate("/login");
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="card overflow-hidden flex flex-col group">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-primary font-medium">{product.category}</span>
        <h3 className="font-semibold text-gray-800 line-clamp-2 mt-1">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-sm text-yellow-500">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center gap-1 text-sm py-1.5"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
