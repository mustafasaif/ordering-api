const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const models = path.join(__dirname); // correct it to path where your model files are
const config = require("../config/db.config.js");

const connectionPool = {
  max: 50000,
  min: 0,
  acquire: 120000,
  idle: 120000,
  evict: 120000,
};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {
    pool: connectionPool,
    // logging: true,
    query: { raw: true },
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    // logging: true,
    pool: connectionPool,
    query: { raw: true },
  });
}

fs.readdirSync(models)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    // Sequelize version <= 5.x
    // var model = sequelize["import"](path.join(models, file));
    // Sequelize version >= 6.x
    var model = require(path.join(models, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize; // for accessing static props and functions like Op.or
db.sequelize = sequelize; // for accessing connection props and functions like 'query' or 'transaction'

module.exports = db;
