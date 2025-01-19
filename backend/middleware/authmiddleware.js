const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Ensure the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.SECRET);

    // Attach the user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
