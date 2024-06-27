module.exports = app => {
    const controller = require('../controller/student_details.controller');

    var router = require('express').Router();

    // endpoint
    router.get('/students', controller.GetStudent);

    // base route
    app.use('/student_detail_api', router);
}