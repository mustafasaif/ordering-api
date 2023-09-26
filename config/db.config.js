const dotenv = require("dotenv");
dotenv.config();
const dbConfig = {
  development: {
    username: `${process.env.DEV_DB_USER}`,
    password: `${process.env.DEV_DB_PASS}`,
    database: `${process.env.DEV_DB_DATABASE}`,
    host: `${process.env.DEV_DB_HOST}`,
    dialect: `${process.env.DEV_DB_DIALECT}`,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

const targetEnv = `${process.env.NODE_ENV}`;
const exportedConfig = Object.keys(dbConfig[targetEnv]).reduce(
  (config, key) => {
    config[key] = `${dbConfig[targetEnv][key]}`;
    return config;
  },
  {}
);

module.exports= exportedConfig;
