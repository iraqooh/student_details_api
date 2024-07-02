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

            const totalExpectedFees = await db.Finance.sum('fees');
            const totalStudents = await db.Student.count();
            const formattedTotalExpected = formatMoney(Number(totalExpectedFees));
            const totalPayments = await db.Payment.sum('amount_paid');
            const formattedTotalPayments = formatMoney(Number(totalPayments));
            const totalOutstandingFees = totalExpectedFees - totalPayments;
            const formattedTotalOutstandingFees = formatMoney(Number(totalOutstandingFees));

            

            res.send({
                status: "OK",
                code: 200,
                data: {
                    total_Expected_Fees:formattedTotalExpected,
                    total_payments: formattedTotalPayments,
                     total_outstanding_fees: formattedTotalOutstandingFees,
                    number_of_students: totalStudents
                   
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