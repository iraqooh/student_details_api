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
                student_id: joi.number().integer().optional(),
                last_transactions: joi.number().integer().optional()
            });

            const { error, value } = schema.validate(req.query);

            if (error) {
                return res.status(400).send({
                    status: "Error",
                    code: 400,
                    message: error.details[0].message
                })
            }

            const { student_id, last_transactions } = value;
            const transactionsCount = last_transactions || 5;

            let financesQuery = {
                attributes: [ 'fees' ],
                where: { student_id: student_id }
            };
            
            let paymentsQuery = {
                attributes: [
                    'student_id',
                    [db.Sequelize.fn('SUM', db.Sequelize.col('amount_paid')), 'total_paid']
                ],
                group: ['student_id']
            };

            if (student_id) {
                // check if student with specified id exists
                const student_id_exists = await db.Student.findByPk(student_id);

                console.log(student_id_exists);
                if (student_id_exists === null) {
                    res.status(404).send({
                        status: "Not Found",
                        code: 404,
                        message: "Student id not found or does not exist"
                    });

                    return;
                }
                
                paymentsQuery.where = { student_id: student_id};

                var feesPerStudent = await db.Finance.findAll(financesQuery);
                var paymentsPerStudent = await db.Payment.findAll(paymentsQuery);

                var formattedPaymentsPerStudent = paymentsPerStudent.map(payment => ({
                    student_id: payment.student_id,
                    total_paid: Number(payment.dataValues.total_paid)
                }));
            }

            // Retrieve and format the sum of fees payments - Harry
            const totalPayments = student_id ? formattedPaymentsPerStudent[0].total_paid : await db.Payment.sum('amount_paid');
            const formattedTotalPayments = formatMoney(Number(totalPayments));

            // Retrieve and format total expected fees from the Finance table - Kon Abraham
            const totalExpectedFees = student_id ? Number(feesPerStudent[0].fees) : await db.Finance.sum('fees');
            const formattedTotalExpectedFees = formatMoney(Number(totalExpectedFees));

            // Retrieve the total number of students registered - Andrew
            const totalStudents = student_id ? 1 : await db.Student.count();

            // Retrieve last x transactions - Samuel
            let lastTransactionsQuery = {
                order: [['createdAt', 'DESC']],
                limit: transactionsCount
            };

            if (student_id) {
                lastTransactionsQuery.where = { student_id: student_id };
            }

            const lastTransactions = await db.Payment.findAll(lastTransactionsQuery);

            const formattedLastTransactions = lastTransactions.map(transaction => ({
                payment_id: transaction.payment_id,
                student_id: transaction.student_id,
                amount_paid: formatMoney(Number(transaction.amount_paid)),
                createdAt: transaction.createdAt
            }));

            res.send({
                status: "OK",
                code: 200,
                data: {
                    total_expected_fees: formattedTotalExpectedFees,
                    total_payments: formattedTotalPayments,
                    percentage_paid: `${Math.round(totalPayments * 100 / totalExpectedFees)}%`,
                    outstanding_fees_payments: formatMoney(totalExpectedFees - totalPayments),
                    number_of_students: totalStudents,
                    last_x_transactions: formattedLastTransactions
                }
            });
        } catch (err) {
            res.status(500).send({
                status: "Error",
                code: 500,
                message: err.message || "Internal server error"
            })
        }
    } else {
        res.send({
            status: "Error",
            code: 405,
            message: "Invalid request method"
        });
    }
}