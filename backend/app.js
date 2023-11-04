const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(cors());

// config
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({
		path: "backend/config/.env",
	});
}

// import routes
const user = require("./controllers/user.controller.js");

app.use("/api/v1/user", user);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
