require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db.config");
const corsOptions = require("./config/cors.config");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Kết nối DB
connectDB();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", require("./routes/index"));

app.use(errorMiddleware);

module.exports = app;
