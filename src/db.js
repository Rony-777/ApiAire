const {Client} = require('pg')

const cliente =  new Client ({
    user: "postgres",
    host: "localhost",
    database: "aire_final",
    password: "123",
    port: "5432"
})

cliente.connect();

module.exports = cliente
