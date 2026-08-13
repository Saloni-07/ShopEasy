import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protects routes - verifies JWT token sent in Authorization header
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader?.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Not authorized, token missing" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Not authorized, user not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };

// Request
//    │
//    ▼
// Authorization header?
//    │
//    ├── NO ──► 401
//    │
//    ▼
// Extract JWT
//    │
//    ▼
// jwt.verify()
//    │
//    ├── INVALID/EXPIRED ──► 401
//    │
//    ▼
// Get decoded.id
//    │
//    ▼
// Find user in MongoDB
//    │
//    ├── NOT FOUND ──► 401
//    │
//    ▼
// req.user = user
//    │
//    ▼
// next()
//    │
//    ▼
// Protected controller