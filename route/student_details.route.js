module.exports = app => {
    const controller = require('../controller/student_details.controller');

    var router = require('express').Router();

    // endpoint
    router.get('/students', controller.GetStudent);

    // add student information
      //use http://localhost:3000/student_detail_api/studentInfo
    router.post('/studentInfo', controller.AddStudentInfo);

    
    // base route
    app.use('/student_detail_api', router);
}