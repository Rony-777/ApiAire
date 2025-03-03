const db = require("../db")

const cargarAire = async (req, res) => {
    const {CO_ppm, temp , pm25} = req.body;

    try {
        const insertarAire = await db.query(
            "INSERT INTO datos_aire (CO_ppm, temp, pm25, fecha_lectura) VALUES ($1, $2, $3) RETURNING *",
            [CO_ppm, temp, pm25]
        );

        res.status(201).json({ message: 'Registro realizado', data: insertarAire.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};


const verAire = async (req, res) => {
    try {
        const insertarAire = await db.query(
            "SELECT * FROM datos_aire ORDER BY fecha_lectura DESC"
        );

        res.status(200).json({  data: insertarAire.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = {cargarAire, verAire}