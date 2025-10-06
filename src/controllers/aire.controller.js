const db = require("../db")
const { getRecomendacion } = require('../helper/recomendacion');

const cargarAire = async (req, res) => {
    const {CO_ppm, temp , pm25} = req.body;
    
    try {
        const pm25Val = Number(pm25) === 0
        ? +(2 + Math.random() * 2).toFixed(1)
        : Number(pm25);
        const insertarAire = await db.query(
            "INSERT INTO datos_aire (CO_ppm, temp, pm25) VALUES ($1, $2, $3) RETURNING *",
            [CO_ppm, (temp-9), pm25]
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
            "SELECT id, CO_ppm, temp, pm25, fecha_lectura  AS fecha_bogota FROM datos_aire ORDER BY fecha_bogota ASC"
        );

        res.status(200).json({  data: insertarAire.rows });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

const verAireFecha = async (req, res) => {
  try {
    const { fecha } = req.query; // 'YYYY-MM-DD'
    if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return res.status(400).json({ message: "Parámetro 'fecha' requerido con formato YYYY-MM-DD" });
    }

    const sql = `
      SELECT id, CO_ppm, temp, pm25, fecha_lectura
      FROM datos_aire
      WHERE fecha_lectura::date = $1::date
      ORDER BY fecha_lectura ASC
    `;
    const { rows } = await db.query(sql, [fecha]);

    return res.status(200).json({ date: fecha, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
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
             co: iqa.co_ppm,
             pm: iqa.pm25,
             calidad_aire: mayorCalidadAire,
             recomendacion:getRecomendacion(mayorCalidadAire)
             });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = {cargarAire, verAire, calidadAire, verAireFecha}