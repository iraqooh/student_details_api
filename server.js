// dependencies

const express = require('express');
const bodyparser = require('body-parser');
const db = require('./models/index');
const populateData = require('./models/populate.data')

// server instance
const app = express();

// server configuration
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false })
    .then(async () => {
        console.log("Database synced");
        if (process.env.POPULATE_DATA === 'true') {
            await populateData();
        }
    });

require('./route/student_details.route')(app);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});