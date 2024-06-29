module.exports = (sequelize, Sequelize) => {
    const Finance = sequelize.define('Finance', {
        finance_id: {
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
        fees: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'finances'
    });

    return Finance;
};
