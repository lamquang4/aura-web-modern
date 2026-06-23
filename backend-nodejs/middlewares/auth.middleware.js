const jwtUtil = require("../utils/jwt.util");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Không có token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.substring(7);

  // Token nhưng sai/hết hạn
  if (!jwtUtil.validateToken(token)) {
    return res
      .status(401)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }

  // Token hợp lệ
  req.user = {
    id: jwtUtil.extractUserId(token),
    role: jwtUtil.extractRole(token),
  };

  next();
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  next();
};

module.exports = { authMiddleware, requireAuth };
