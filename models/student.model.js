module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('Student', {
        student_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false
        },
        parent_telephone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        physical_address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.ENUM('DAY', 'BOARDING'),
            allowNull: false
        },
        class: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'students'
    });

    return Student;
};
