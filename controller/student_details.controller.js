const db = require('../models/index')
const joi = require('joi');
const operation = db.Sequelize.Op;
const Studentfees = db.payments;
const Student = db.students;
const studentfinance = db.finances;

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

            const totalExpectedFees = await db.Finance.sum('fees');
            const formattedTotalExpected = formatMoney(Number(totalExpectedFees));
            const totalPayments = await db.Payment.sum('amount_paid');
            const formattedTotalPayments = formatMoney(Number(totalPayments));

            res.send({
                status: "OK",
                code: 200,
                data: {
                    total_Expected_Fees:formattedTotalExpected,
                    total_payments: formattedTotalPayments,
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


// const AddStudentInfo = async (req, res) => {
    
    
//  // used to enter student information
//  let studentdata = {
//             full_name: req.body.full_name,
//              dob:req.body.dob,
//              parent_telephone:req.body.parent_telephone,
//              physical_address:req.body.physical_address,
//              category:req.body.category,
//             class: req.body.class,
//             status:req.body.status?req.body.status:false
//         }

//        const studentinfo = await Student.Create(studentdata)
//           res.status(200).send(studentinfo)
//          console.log(studentinfo)
    

// }


// this is used to enter raw data on postman or insomnia
exports.AddStudentInfo = (req, res) => {
     if(req.method == "POST"){

        if(!req.body.full_name){
            res.send({
                status: "Error",
                message: "Student Full Name is required",
            }); 

            return;
        }

        if(!req.body.dob){
            res.send({
                status: "Error",
                message: "Student's date of birth is required",
            }); 

            return;
        }

        if(!req.body.physical_address){
            res.send({
                status: "Error",
                message: "Student's physical_address is needed",
            }); 

            return;
        }
        if(!req.body.parent_telephone){
            res.send({
                status: "Error",
                message: "Student's parent telephone is needed",
            }); 

            return;
        }
        if(!req.body.category){
            res.send({
                status: "Error",
                message: "Student's category is required (DAY OR BOARDING)",
            }); 

            return;
        }
        if(!req.body.class){
            res.send({
                status: "Error",
                message: "Student's class is required",
            }); 

            return;
        }
        if(!req.body.status){
            res.send({
                status: "Error",
                message: "Student's status is required (true Or false)",
            }); 

            return;
        }
        if(!req.body.amount_paid){
            res.send({
                status: "Error",
                message: "Student's Amount_Paid is required",
            }); 

            return;
        }
        if(!req.body.fees){
            res.send({
                status: "Error",
                message: "Student's Fees is required",
            });

            return;
        }

        // this is used to check invalid entrance of student information

        const studentdata = {
            full_name: req.body.full_name,
            dob:req.body.dob,
            parent_telephone:req.body.parent_telephone,
            physical_address:req.body.physical_address,
            category:req.body.category,
           class: req.body.class,
           status:req.body.status
        }

        Student.create(studentdata).then(
            async data => {
                // if(data == 1){
                    await Studentfees.create({
                        student_id: data.student_id,
                        amount_paid: req.body.amount_paid
                    });
                    await studentfinance.create({
                        student_id: data.student_id,
                        fees: req.body.fees
                    });

                    res.send({
                        status: "Success",
                        status_code: 100,
                        message: "Student Added",
                        result: data
                    });
            }
        ).catch(err => {
            res.status(500).send({
                status: "Error",
                message: err.message || "Error Occurred While adding a new student"
            });
        });

     }else{

        res.status(500).send({
            status: "Error",
            message: "THIS METHOD IS NOT APPLICABLE TO THIS API"
        });

     }

}

