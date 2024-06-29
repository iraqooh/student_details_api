const db = require('./index');
const { Student, Finance, Payment} = db;

// function to generate a random school fees for each student
const generateRandomFees = () => {
    const minFee = 500000;
    const maxFee = 5000000;
    const multiple = 5000;
    const min = minFee / multiple;
    const max = maxFee / multiple;
    const randomMultiple = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomMultiple * multiple;
};

// generates a random percentage of initial fees payment
const generateRandomInitialPayment = (fees) => {
    const minPercentage = 30;
    const maxPercentage = 100;
    const randomPercentage = Math.random() * (maxPercentage - minPercentage) + minPercentage;
    const initialPayment = (randomPercentage / 100) * fees;
    return Math.round(initialPayment / 5000) * 5000;
};

const populateData = async () => {
    const students = [
        { full_name: 'John Doe', dob: '2000-01-01', parent_telephone: '+256724567890', physical_address: '123 Main St', category: 'DAY', class: '10', status: true },
        { full_name: 'Jane Smith', dob: '2001-02-02', parent_telephone: '+256787654321', physical_address: '456 Elm St', category: 'BOARDING', class: '11', status: true },
        { full_name: 'Emily Johnson', dob: '2002-03-03', parent_telephone: '+256787654322', physical_address: '789 Oak St', category: 'DAY', class: '10', status: true },
        { full_name: 'Alexander Brown', dob: '2000-04-04', parent_telephone: '+256787654323', physical_address: '321 Maple St', category: 'BOARDING', class: '12', status: false },
        { full_name: 'Sophia Davis', dob: '2001-05-05', parent_telephone: '+256787654324', physical_address: '901 Pine St', category: 'DAY', class: '9', status: true },
        { full_name: 'Olivia Martin', dob: '2002-06-06', parent_telephone: '+256787654325', physical_address: '234 Elm St', category: 'BOARDING', class: '11', status: true },
        { full_name: 'Jackson Williams', dob: '2000-07-07', parent_telephone: '+256787654326', physical_address: '567 Oak St', category: 'DAY', class: '10', status: false },
        { full_name: 'Ava Garcia', dob: '2001-08-08', parent_telephone: '+256787654327', physical_address: '890 Maple St', category: 'BOARDING', class: '12', status: true },
        { full_name: 'Ethan Thompson', dob: '2002-09-09', parent_telephone: '+256787654328', physical_address: '345 Pine St', category: 'DAY', class: '9', status: true },
        { full_name: 'Mia White', dob: '2000-10-10', parent_telephone: '+256787654329', physical_address: '123 Elm St', category: 'BOARDING', class: '11', status: false },
        { full_name: 'Isabella Harris', dob: '2001-11-11', parent_telephone: '+256787654330', physical_address: '678 Oak St', category: 'DAY', class: '10', status: true },
        { full_name: 'Julian Sanchez', dob: '2002-12-12', parent_telephone: '+256787654331', physical_address: '456 Maple St', category: 'BOARDING', class: '12', status: true },
        { full_name: 'Gabriella Wright', dob: '2000-01-01', parent_telephone: '+256757654332', physical_address: '901 Pine St', category: 'DAY', class: '9', status: false },
        { full_name: 'Sofia Mitchell', dob: '2001-02-02', parent_telephone: '+256707654333', physical_address: '234 Elm St', category: 'BOARDING', class: '11', status: true },
        { full_name: 'Logan Hall', dob: '2002-03-03', parent_telephone: '+256787654334', physical_address: '567 Oak St', category: 'DAY', class: '10', status: true },
        { full_name: 'Abigail Lee', dob: '2000-04-04', parent_telephone: '+256787654335', physical_address: '890 Maple St', category: 'BOARDING', class: '12', status: false },
        { full_name: 'Lila Patel', dob: '2001-05-05', parent_telephone: '+256787654336', physical_address: '345 Pine St', category: 'DAY', class: '9', status: true },
        { full_name: 'Caleb Russell', dob: '2002-06-06', parent_telephone: '+256787654337', physical_address: '123 Elm St', category: 'BOARDING', class: '11', status: true },
        { full_name: 'Avery Reed', dob: '2000-07-07', parent_telephone: '+256787654338', physical_address: '678 Oak St', category: 'DAY', class: '10', status: false },
        { full_name: 'Riley Foster', dob: '2001-08-08', parent_telephone: '+256787654339', physical_address: '456 Maple St', category: 'BOARDING', class: '12', status: true }
    ];

    for (const studentData of students) {
        const student = await Student.create(studentData);
        const fees = generateRandomFees();
        await Finance.create({ student_id: student.student_id, fees });

        const initialPayment = generateRandomInitialPayment(fees);
        await Payment.create({ student_id: student.student_id, amount_paid: initialPayment });

        if (initialPayment < fees) {
            const additionalPayment = generateRandomInitialPayment(fees - initialPayment);
            await Payment.create({ student_id: student.student_id, amount_paid: additionalPayment });
        }
        
    }

    console.log('Sample data inserted');
};

module.exports = populateData;