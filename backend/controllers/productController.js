import Product from "../models/Product.js";

// @route GET /api/products
// Supports ?search=term  and  ?category=cat
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      // Regex search across name, description, category, brand
      // so partial/related matches show up (e.g. "shoe" -> "running shoes")
      const regex = new RegExp(search, "i");
      query = {
        $or: [{ name: regex }, { description: regex }, { category: regex }, { brand: regex }],
      };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/:id/related
// Returns other products from the same category
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/meta/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
