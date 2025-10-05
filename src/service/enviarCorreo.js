const nodemailer = require('nodemailer');

const sendResetEmail = async (email, asunto , texto) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,        // STARTTLS
        secure: false, 
        auth: {
            user: 'rony893000@gmail.com',
            pass: 'kcjhfjkyspjdehvl'
        }
    });

    const send = await transporter.sendMail({
        from: { name: 'Calidad del Aire', address: 'rony893000@gmail.com' },
        to: email,
        subject: asunto,
        text: texto
    });
};

module.exports = sendResetEmail