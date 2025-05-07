const db = require("../db")
const { getRecomendacion } = require('../helper/recomendacion');

const cargarAire = async (req, res) => {
    const {CO_ppm, temp , pm25} = req.body;
    
    try {
        const insertarAire = await db.query(
            "INSERT INTO datos_aire (CO_ppm, temp, pm25) VALUES ($1, $2, $3) RETURNING *",
            [CO_ppm, temp, pm25]
        );
        console.log(  insertarAire.rows[0]);
        
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

const calidadAire = async (req, res) => {
    try {
        const data = await db.query(
            "SELECT * FROM datos_aire ORDER BY fecha_lectura DESC LIMIT 1;"
        );

        const iqa = data.rows[0]; 

        
        const mayorCalidadAire = iqa.pm25 > iqa.co_ppm ? iqa.pm25 : iqa.co_ppm;

        

        res.status(200).json({
             fecha: iqa.fecha_lectura,
             calidad_aire: mayorCalidadAire,
             recomendacion:getRecomendacion(mayorCalidadAire)
             });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = {cargarAire, verAire, calidadAire}