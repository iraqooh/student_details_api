## Student Details API

### Overview

This API retrieves student analytics data from a MySQL database using Sequelize and Express. It provides endpoints to fetch total expected fees, total amount paid, total outstanding fees, total number of students, and percentage of paid vs expected fees. Additionally, it fetches the last few transactions of payments for a specified student ID.

### Features

- Retrieves student analytics data
- Uses Sequelize for database interactions
- Implements input validation with Joi
- Enables cross-origin resource sharing with CORS
- Returns data in JSON format

### Endpoints

- /school_api/students: Retrieves student analytics data
    - Query parameter: student_id (integer)

### Database Configuration

- Database: MySQL
- Host: localhost
- User: root
- Password: none
- Database name: studentms
- Pool configuration: max 5, min 0, acquire 30000, idle 10000

### Dependencies

- Express
- Sequelize
- MySQL2
- CORS
- Body-parser
- Joi

### Installation

1. Clone the repository
2. Run npm install to install dependencies
3. Create a MySQL database with the specified configuration
4. Start the server with ```node server.js```
5. Access the API at http://localhost:3000/school_api/students

### License

MIT License

### Authors

[Iraku Harry](https://github.com/iraqooh/)
[Akoldou Samuel]()
[Ngong Abraham Kon]()
[Andrew ?]()
