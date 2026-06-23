const jwt = require("jsonwebtoken");
const config = require("../config/app.config");

const generateToken = (userId, role) => {
  return jwt.sign({ sub: userId, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const extractUserId = (token) => {
  return verifyToken(token).sub;
};

const extractRole = (token) => {
  return verifyToken(token).role;
};

const isTokenExpired = (token) => {
  const { exp } = verifyToken(token);
  return Date.now() >= exp * 1000;
};

const validateToken = (token) => {
  try {
    jwt.verify(token, config.jwt.secret);
    return true;
  } catch (error) {
    return false;
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

module.exports = {
  generateToken,
  extractUserId,
  extractRole,
  isTokenExpired,
  validateToken,
  verifyToken,
};
