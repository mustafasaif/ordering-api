const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { logger } = require("./utils/logger.js");
const { errorConverter, errorHandler } = require("./middlewares/error.js");
// const db = require("./models/index.js");
const router = require("./routes/index.js");
dotenv.config();

// const { User } = db;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/v1", router());
app.use(errorConverter);
app.use(errorHandler);


// db.sequelize
//   .authenticate()
//   .then(() => console.log("done"))
//   .catch((err) => console.log(err));

// User.findAll()
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((errr) => {
//     console.log(errr);
//   });

app.listen(process.env.PORT, () => {
  logger.info(`listening to port ${process.env.PORT}`);
});
