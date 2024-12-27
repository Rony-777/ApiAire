const nodemailer = require('nodemailer');

const sendResetEmail = async (email, asunto , texto) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rony893000@gmail.com',
            pass: 'kcjhfjkyspjdehvl'
        }
    });

    const send = await transporter.sendMail({
        from: 'calidadAire@Aire_Render.com',
        to: email,
        subject: asunto,
        text: texto
    });
};

module.exports = sendResetEmail