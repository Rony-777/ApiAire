const { Client } = require('pg');


const cliente = new Client({
  connectionString: 'postgresql://calidad_aire_wh9v_user:2rH2RDJZU5rcpuP84objWvW4WGVe2Tx2@dpg-cvvbhqre5dus73bbgtv0-a/calidad_aire_wh9v',
  ssl: {
    rejectUnauthorized: false
  }
});


cliente.connect()
  .then(() => console.log("Conexión exitosa a la base de datos en Render"))
  .catch(err => console.error("Error de conexión a la base de datos:", err));

module.exports = cliente;