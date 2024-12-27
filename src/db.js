const { Client } = require('pg');


const cliente = new Client({
  connectionString: 'postgresql://rony:t6BmyydCx717mUp4YcB0daZTtGoTkoNA@dpg-ctkqbipopnds7381efq0-a.oregon-postgres.render.com/calidad_aire_wn5n',
  ssl: {
    rejectUnauthorized: false
  }
});


cliente.connect()
  .then(() => console.log("Conexión exitosa a la base de datos en Render"))
  .catch(err => console.error("Error de conexión a la base de datos:", err));

module.exports = cliente;