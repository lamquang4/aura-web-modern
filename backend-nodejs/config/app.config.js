require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,

  // MongoDB
  mongoUri: process.env.MONGODB_URI,

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || 86400000,
  },

  // Bcrypt
  bcryptSaltRounds: 10,

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // Google OAuth2
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  // CORS
  cors: {
    allowedOrigins: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://aura-web-modern.onrender.com",
    ],
  },
};
