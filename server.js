// dependencies

const express = require('express');
const bodyparser = require('body-parser');
const db = require('./models/index');

// server instance
const app = express();

// server configuration
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Database synced");
    });

require('./route/student_details.route');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});