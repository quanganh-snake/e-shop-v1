const app = require("./app.js");
const connectDatabase = require("./db/Database.js");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`>>> Error: ${err.message}`);
	console.log(`Shutting down the server for handling uncaught exception`);
});

// config
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({
		path: "backend/config/.env",
	});
}

// connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
	console.log(`>>> Server is Running`);
	console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`>>> Error: ${err.message}`);
	console.log(`Shutting down the server for unhandled rejection`);
	server.close(() => {
		process.exit(1);
	});
});
