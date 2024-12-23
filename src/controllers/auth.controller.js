const db = require("../db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'clave_super_secreta';

const register = async (req, res) => {
    const { nombre, email, password } = req.body
    try {
        if (!nombre || !email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });

        const userExists = await db.query('SELECT * FROM usuario WHERE email = $1', [email])
        if (userExists.rowCount > 0) return res.status(400).json({ message: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10)

        const response = await db.query(
            'INSERT INTO usuario (nombre, email, password) VALUES ($1, $2 ,$3)',
            [nombre, email, hashedPassword]);
        
        res.status(201).json({ message: 'Usuario registrado exitosamente'});
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await db.query('SELECT * FROM usuario WHERE email = $1', [email])

        if (!email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        if (!userExists.rowCount > 0) return res.status(400).json({ message: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, userExists.rows[0].password)

        if (!isMatch)  return res.status(400).json({ message: 'Credenciales inválidas' });

        const user =  userExists.rows[0]

        const token = jwt.sign({id: user.id,  email: user.email}, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { register, login };
