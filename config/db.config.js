module.exports = {
    HOST: "localhost",
    PORT: 3306,
    USER: "root",
    PASSWORD: "",
    DB: "harry_ngong_andrew_samuel",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
