import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PackageSearch,
  Tag,
  Award,
  ShieldCheck,
  PackageCheck,
  Headphones,
} from "lucide-react";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

const heroFeatures = [
  { icon: Award, label: "Best Deals" },
  { icon: ShieldCheck, label: "Secure Shopping" },
  { icon: PackageCheck, label: "Wide Selection" },
  { icon: Headphones, label: "Easy Support" },
];

const Home = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products/meta/categories")
      .then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setActiveCategory("All");
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (activeCategory !== "All") params.category = activeCategory;
        const { data } = await api.get("/products", { params });
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, activeCategory]);

  return (
    <div>
      {/*Hero Sectiion */}
      {!search && (
        <div className="bg-cyan-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 py-4 md:py-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 border border-gray-600 rounded-full px-6 py-1.5 text-xs tracking-widest text-gray-300 mb-6">
                <Tag size={18} />
                EVERYTHING YOU NEED
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Shop Smart.
                <br />
                <span className="text-amber-400">Shop Easy.</span>
              </h1>

              <div className="w-16 h-1 bg-amber-400 rounded-full my-6" />

              <p className="text-gray-300 max-w-md mb-8">
                Discover great deals on electronics, fashion, home essentials
                and more — all in one place.
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {heroFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-2">
                    <Icon size={22} className="text-amber-400" />
                    <span className="text-sm text-gray-300 whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870&auto=format&fit=crop&w=1000&q=80"
                alt="ShopEasy featured products"
                className="max-w-full max-h-48 sm:max-h-60 md:max-h-72 lg:max-h-80 w-auto object-contain rounded-2xl"
                style={{
                  maskImage: "radial-gradient(ellipse 70% 70% at center, black 55%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 70% at center, black 55%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-300 hover:border-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {search && (
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {products.length > 0
              ? `Showing ${products.length} result${products.length > 1 ? "s" : ""} for "${search}"`
              : `No results for "${search}"`}
          </h2>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <PackageSearch size={48} className="mx-auto mb-3 opacity-50" />
            No products found. Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
