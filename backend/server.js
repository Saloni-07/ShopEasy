import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials:true, //Allows the browser to send credentials with cross-origin requests, such as:Cookies,Session cookies, Authentication-related credentials
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Shopping API is running...");
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT;

const startServer = async () =>{
  await connectDB();

  app.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();