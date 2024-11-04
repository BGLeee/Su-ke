const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

//Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Uncaught exception. Shutting down...");
  process.exit(1);
});

//Setting up config file
dotenv.config({ path: "backend/config/config.env" });

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Unhandled Rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
