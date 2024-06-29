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

// import models and create associations
const Student = require('./student.model')(sequelize, Sequelize);
const Finance = require('./finance.model')(sequelize, Sequelize);
const Payment = require('./payment.model')(sequelize, Sequelize);

Student.hasMany(Finance, { foreignKey: 'student_id' });
Finance.belongsTo(Student, { foreignKey: 'student_id' });

Student.hasMany(Payment, { foreignKey: 'student_id' });
Payment.belongsTo(Student, { foreignKey: 'student_id' });

// connection object
const db = {
    sequelize,
    Sequelize,
    Student,
    Finance,
    Payment
}

// module imports[, associations] and assignments here

module.exports = db;