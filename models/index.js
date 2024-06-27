// database setup
const db_config = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    db_config.DB, db_config.USER, db_config.PASSWORD,
    {
        host: db_config.HOST,
        port: db_config.PORT,
        dialect: db_config.dialect,
        pool: {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle
        }
    }
);

// check database connection
sequelize.authenticate().then(
    console.log("Connected to MySQL database")
).catch(err => {
    console.error("");
});

// connection object
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// module imports[, associations] and assignments here

module.exports = db;