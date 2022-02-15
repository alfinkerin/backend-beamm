const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const limiter = require("./middleware/limit");
const bodyParser = require("body-parser");

const app = express();
//Body parser
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// helmet protect
app.use(helmet());

// xss protect
app.use(xss());

//routes file
const authRoute = require("./routes/authRoute");
//connetct Database
connectDB();

//load env vars
dotenv.config({ path: "./config/config.env" });

// config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount routers
app.use("/api", authRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
