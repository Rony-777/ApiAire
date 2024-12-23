const router = require('express').Router();
const { register, login } = require("../controllers/auth.controller")
const authenticateToken = require ("../middlewares/authValidator")



router.post('/register', register)
router.post('/login', login)

router.get('/perfil', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Bienvenido a tu perfil', user: req.user });
});

module.exports = router