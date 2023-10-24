const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { logger } = require("./utils/logger.js");
const { errorConverter, errorHandler } = require("./middlewares/error.js");
const router = require("./routes/index.js");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/v1", router());
app.use(errorConverter);
app.use(errorHandler);

const serverPort =
  process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

const server = app.listen(serverPort, () => {
  logger.info(`Listening to port ${serverPort}`);
});

// Export the Express app and server for testing
module.exports = { app, server };
