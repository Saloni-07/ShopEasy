import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingCart, Search, User, LogOut, Store, Package, PackagePlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";


const Navbar = () => {

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.name ? user.email .split(" ").map((n) => n[10]).slice(0, 2).join("").toUpperCase():"";


  return (
    <nav className="bg-gray-800 border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-2xl shrink-0"
        >
          <Store size={24} className="text-primary" />
          ShopEasy
        </Link>

        <div className="hidden md:flex items-center gap-1 shrink-0">
          {/* <Link
            to="/"
            className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            Shop 
          </Link> */}

          {isAuthenticated && (
            <Link
              to="/orders"
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Orders{" "}
            </Link>
          )}

          {/* {user?.isAdmin && (
            <link
              to="/admin/add-product"
              className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              Add Product
            </link>
          )} */}
          
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-xs mx-auto">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-4 top-1/3 -tranlate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products, brands, categories.. "
              className="w=full bg-white/10 border border-white/10 rounded-full pl-11 pr-11 py-2.5 text-base text-white placeholder-gray-400 text-justify focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/[0.15] transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/cart"
            className="relative text-gray-300 hover:text-white transition-colors"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px]font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              
              <div
                className="h-8 w-8 rounded-full bg-emerald-700 text-gray-800 font-bold flex items-center justify-center"
                title={user.email}
              >
                {initials}
              </div>

              <button
                onClick={handleLogout}
                className="gap-1 text-gray-300 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-secondary hover:bg-sky-200 text-white text-sm font-medium py-1.5 px-4 rounded-full transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center gap-1 px-4 pb-1 overflow-x-auto">

        {/* {isAuthenticated && (
          <Link
            to="/orders"
            className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white whitespace-nowrap"
          >
            {" "}
            Orders{" "}
          </Link>
        )} */}

        {/* {user?.isAdmin && (
          <Link
            to="/admin/add-product"
            className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:bg-white/10 hover:text-white whitespace-nowrap"
          > Add Product </Link>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
