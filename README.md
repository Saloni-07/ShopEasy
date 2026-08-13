# ShopEasy — MERN Stack Ecommerce Website

A full-stack shopping website built with **MongoDB, Express, React (Vite), Node.js** —
with JWT + bcrypt authentication, a working search bar, dynamic product pages,
cart, and a checkout flow with multiple payment options.

## Features

- Register / Login with **JWT tokens** and **bcrypt password hashing**
- Attractive, responsive home page (Tailwind CSS) 
- **Search bar** — searches product name, description, category, and brand,
  so related products show up too
- Product details page with **related products**
- **Add to Cart** button — if not logged in, redirects to Login page
- Cart page with quantity update / remove
- Checkout page with shipping address form and **payment method selection**
  (Cash on Delivery, Card, UPI, Net Banking — demo only, no real gateway)
- Order success page
- Protected routes (Cart, Checkout, Orders) — only accessible when logged in

## Tech Stack

**Frontend:** React , Vite, React Router, Tailwind CSS, Axios, react-hot-toast, lucide-react
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs

## Project Structure

```
shopEasy/
├── backend/
│   ├── config/        #Databse connectivity
│   ├── models/        # User, Product, Order (Mongoose schemas)
│   ├── controllers/    # Business logic
│   ├── routes/         # API routes
│   ├── middleware/      # JWT auth middleware
│   ├── seed/            # Script to seed sample products
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Navbar, ProductCard, Footer, ProtectedRoute
        ├── pages/        # Home, Login, Register, ProductDetails, Cart, Checkout, OrderSuccess
        ├── context/      # AuthContext, CartContext
        └── api/          # Axios instance with JWT interceptor

```

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+) installed
- MongoDB Atlas cluster (get the connection string)

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

In `.env` set your `MONGO_URI` (Atlas) and a strong `JWT_SECRET`.

Seed the database with sample products (so the site isn't empty):
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
Backend runs at **http://localhost:PORT**

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
```

`VITE_API_URL` in `.env` should point to `http://localhost:${PORT}/api` .

Start the frontend:
```bash
npm run dev
```
Frontend runs at **http://localhost:5173**

### 4. Try it out
1. Open http://localhost:5173
2. Browse products, use the search bar (try "shoes", "headphones", "book")
3. Click "Add to Cart" — you'll be redirected to Login/Register since you're not logged in
4. Register a new account (password is hashed with bcrypt before saving)
5. Login — you receive a JWT token, stored in localStorage, sent with every API request
6. Add products to cart, go to Cart → Checkout
7. Fill shipping address, pick a payment method, place the order
8. See the Order Success page with your order details

## Extra Points
- Frontend attaches the JWT automatically to every request via an **Axios interceptor**.
- Cart is stored per-user in MongoDB (not just localStorage), so it persists across devices/sessions.
- Payment integration here is a **/demo** (no real gateway)
 we can use Razorpay/Stripe integration as a "future enhancement"