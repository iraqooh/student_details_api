const db = require('../models/index')
const joi = require('joi');
const operation = db.Sequelize.Op;

// API logic
exports.GetStudent = (req, res) => {
    if (req.method === 'GET') {

    } else {
        res.send({
            status: "Error",
            code: 500,
            message: "Invalid request method"
        });
    }
}