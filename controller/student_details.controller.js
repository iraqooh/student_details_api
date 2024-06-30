const db = require('../models/index')
const joi = require('joi');
const operation = db.Sequelize.Op;

function formatMoney(number) {
    return number.toLocaleString('en-US');
}

// API logic
exports.GetStudent = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const schema = joi.object({
                student_id: joi.number().integer().optional()
            });

            const { error, value } = schema.validate(req.query);

            if (error) {
                return res.status(400).send({
                    status: "Error",
                    code: 400,
                    message: error.details[0].message
                })
            }

            const { student_id } = value;

            let paymentsQuery = {
                attributes: [
                    'student_id',
                    [db.Sequelize.fn('SUM', db.Sequelize.col('amount_paid')), 'total_paid']
                ],
                group: ['student_id']
            };

            if (student_id) {
                paymentsQuery.where = { student_id: student_id};
            }

            // const paymentsPerStudent = await db.Payment.findAll(paymentsQuery);

            // const formattedPaymentsPerStudent = paymentsPerStudent.map(payment => ({
            //     student_id: payment.student_id,
            //     total_paid: formatMoney(Number(payment.dataValues.total_paid))
            // }));

            const totalPayments = await db.Payment.sum('amount_paid');
            const formattedTotalPayments = formatMoney(Number(totalPayments));

            res.send({
                status: "OK",
                code: 200,
                data: {
                    total_payments: formattedTotalPayments,
                    // payments_per_student: formattedPaymentsPerStudent
                }
            });
        } catch (err) {
            res.status(500).send({
                status: "Error",
                code: 500,
                message: err.message || "Database read error"
            })
        }
    } else {
        res.send({
            status: "Error",
            code: 500,
            message: "Invalid request method"
        });
    }
}