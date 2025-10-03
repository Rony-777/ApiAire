const { Client } = require('pg');


const cliente = new Client({
  connectionString: 'postgresql://root:6v3zTZtY0pqtq3EvAakjODXsOOPRS34x@dpg-d3g0hs0gjchc738238r0-a/calidad_aire_ronn',
  ssl: {
    rejectUnauthorized: false
  }
});


cliente.connect()
  .then(() => console.log("Conexión exitosa a la base de datos en Render"))
  .catch(err => console.error("Error de conexión a la base de datos:", err));

module.exports = cliente;