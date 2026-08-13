import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Over-ear wireless headphones with noise cancellation and 30hr battery life.",
    price: 2499,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 40,
    rating: 4.3,
  },
  {
    name: "Smartwatch Fitness Tracker",
    description: "Track your heart rate, steps, and sleep with this stylish smartwatch.",
    price: 3199,
    category: "Electronics",
    brand: "FitPro",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 25,
    rating: 4.1,
  },
  {
    name: "Men's Running Shoes",
    description: "Lightweight breathable running shoes designed for comfort and speed.",
    price: 1899,
    category: "Footwear",
    brand: "Stride",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 60,
    rating: 4.5,
  },
  {
    name: "Women's Casual Sneakers",
    description: "Trendy everyday sneakers with cushioned soles for all-day comfort.",
    price: 1699,
    category: "Footwear",
    brand: "Stride",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
    stock: 55,
    rating: 4.4,
  },
  {
    name: "Cotton Casual Shirt",
    description: "100% cotton slim-fit shirt, perfect for office and casual wear.",
    price: 899,
    category: "Clothing",
    brand: "UrbanFit",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
    stock: 80,
    rating: 4.0,
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket with a modern relaxed fit.",
    price: 1999,
    category: "Clothing",
    brand: "UrbanFit",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    stock: 30,
    rating: 4.2,
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle that keeps drinks cold for 24 hours.",
    price: 599,
    category: "Home & Kitchen",
    brand: "HydroLife",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    stock: 100,
    rating: 4.6,
  },
  {
    name: "Non-Stick Frying Pan",
    description: "Durable non-stick frying pan suitable for all stovetops.",
    price: 1299,
    category: "Home & Kitchen",
    brand: "CookWell",
    image: "https://images.unsplash.com/photo-1584990347449-a5d9f800a783?w=500",
    stock: 45,
    rating: 4.3,
  },
  {
    name: "Bestseller Fiction Novel",
    description: "A gripping fiction novel that topped the charts this year.",
    price: 399,
    category: "Books",
    brand: "PagePress",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 70,
    rating: 4.7,
  },
  {
    name: "Self-Help Motivational Book",
    description: "Practical strategies to build habits and boost productivity.",
    price: 349,
    category: "Books",
    brand: "PagePress",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    stock: 65,
    rating: 4.5,
  },
  {
    name: "Bluetooth Portable Speaker",
    description: "Compact speaker with deep bass and 12 hours of playtime.",
    price: 1599,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    stock: 35,
    rating: 4.4,
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather bi-fold wallet with multiple card slots.",
    price: 799,
    category: "Accessories",
    brand: "UrbanFit",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    stock: 90,
    rating: 4.2,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`Seeded ${products.length} products successfully`);
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
