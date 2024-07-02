## Student Details API

### Overview

This API retrieves student analytics data from a MySQL database using Sequelize and Express. It provides endpoints to fetch total expected fees, total amount paid, total outstanding fees, total number of students, and percentage of paid vs expected fees. Additionally, it fetches the last 5 transactions of payments. The number of transactions can be specified using the last_transactions query parameter. Consumers also have the option to specify the student ID to retrieve the mentioned parameters for the specified student.

### Features

- Retrieves student analytics data
- Uses Sequelize for database interactions
- Implements input validation with Joi
- Enables cross-origin resource sharing with CORS
- Returns data in JSON format

### Endpoints

- `/school_api/students`: Retrieves student analytics data
    - Query parameter: `student_id` (integer)
    - Query parameter: `last_transactions` (integer)

### Database Configuration

- Database: MySQL
- Host: localhost
- User: root
- Password: none
- Database name: studentms
- Pool configuration: max 5, min 0, acquire 30000, idle 10000

### Table Attributes

#### Student Table
- `student_id`: INTEGER, autoIncrement, primaryKey
- `full_name`: STRING, not null
- `dob`: DATE, not null
- `parent_telephone`: STRING, not null
- `physical_address`: STRING, not null
- `category`: ENUM('DAY', 'BOARDING'), not null
- `class`: STRING, not null
- `status`: BOOLEAN, not null

#### Finance Table
- `finance_id`: INTEGER, autoIncrement, primaryKey
- `student_id`: INTEGER, foreignKey
- `fees`: INTEGER, not null

#### Payment Table
- `payment_id`: INTEGER, autoIncrement, primaryKey
- `student_id`: INTEGER, foreignKey
- `amount_paid`: INTEGER, not null

### Dependencies

- Express
- Sequelize
- MySQL2
- CORS
- Body-parser
- Joi

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a MySQL database with the specified configuration
4. Start the server:
    - Without populating data:
      ```sh
      npm start
      ```
    - With populating data:
      ```sh
      npm run start:populate
      ```
5. Access the API at `http://localhost:3000/student_detail_api/students`

### License

MIT License

### Authors

[Iraku Harry](https://github.com/iraqooh/)

[Akoldou Samuel](https://github.com/Akoldou)

[Ngong Abraham Kon](https://github.com/Ngongkon)

[Andrew Efiti](https://github.com/1efitiAnndrew)
