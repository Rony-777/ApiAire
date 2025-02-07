const { Client } = require('pg');


const cliente = new Client({
  connectionString: 'postgresql://rony:NK2K20xy3QVUQK0YJ1HS0IcZQbTxraiY@dpg-cuj8oa8gph6c73bd2aog-a/calidad_aire_jep3',
  ssl: {
    rejectUnauthorized: false
  }
});


cliente.connect()
  .then(() => console.log("Conexión exitosa a la base de datos en Render"))
  .catch(err => console.error("Error de conexión a la base de datos:", err));

module.exports = cliente;