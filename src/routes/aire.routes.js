const router = require('express').Router();
const { cargarAire, verAire, calidadAire } = require("../controllers/aire.controller")

router.post('/cargar', cargarAire)
router.get('/ver', verAire)
router.get('/iqa', calidadAire)

module.exports = router