import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Get token from cookies

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Attach user data to request
    req.user = decoded;

    next(); // Continue to next middleware or route
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
export const verifyRole = (roles) => (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
