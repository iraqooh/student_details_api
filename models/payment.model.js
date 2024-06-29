module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define('Payment', {
        payment_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        student_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'students',
                key: 'student_id'
            },
            allowNull: false
        },
        amount_paid: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'payments'
    });

    return Payment;
};
