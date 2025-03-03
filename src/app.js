const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', require ("./routes/auth.routes"));
app.use('/api/aire', require ("./routes/aire.routes"));

app.get('/', (req, res) => {
    res.send('¡Hola, mundo desde Express!');
});
const port = process.env.PORT || 3000;
app.listen(port,  () => {
    console.log(`Servidor corriendo en http://192.168.20.15:${3000}`);
});