const db = require("../db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendMail = require ("../service/enviarCorreo");

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

        const asunto = 'Cuanta creada con exito'
        const texto = `Hola ${nombre}, ¡Gracias por registrarte en el portal web.!`

        sendMail(email, asunto, texto)
        
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

const requestCambiarPassword = async (req, res)=>{
    const {email} = req.body

    try {
        const user = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (user.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const token = crypto.randomBytes(32).toString('Hex');
        const expires = new Date(Date.now() + (6*60 * 60 * 1000));
        

        await db.query(
            'UPDATE usuario SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
            [token, expires, email]
        );

        const resetLink = `https://68e2c34837818900085d0e50--calidad-aire.netlify.app/cambiar-contrase%C3%B1a?token=${token}`;
        const asunto = 'Restablece tu contraseña'
        const texto = `Haz clic en este enlace para restablecer tu contraseña: ${resetLink}`

        sendMail(email, asunto, texto);

        res.status(200).json({ message: 'Se ha enviado el enlace para restablecer la contraseña' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}

const cambiarPassword = async (req, res) => {
    const {token, nuevaPassword} = req.query
    try {
        
        
        const user = await db.query(
            'SELECT * FROM usuario WHERE reset_token = $1 AND reset_token_expires >  NOW()',
            [token]
        );        
        

        if (user.rowCount === 0) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

        await db.query(
            'UPDATE usuario SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
            [hashedPassword, user.rows[0].id]
        );

        res.status(200).json({ message: 'Contraseña restablecida exitosamente' });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}


module.exports = { register, login, requestCambiarPassword, cambiarPassword };
