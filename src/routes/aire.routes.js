const router = require('express').Router();
const { cargarAire, verAire } = require("../controllers/aire.controller")

router.post('/cargar', cargarAire)
router.get('/ver', verAire)