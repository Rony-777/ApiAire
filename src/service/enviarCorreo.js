// src/sendResetEmail.js
const nodemailer = require('nodemailer');

// SMTP SendGrid por el puerto 2525 (compatible con Render Free)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 2525,
  secure: false,
  auth: {
    user: 'apikey', // literal 'apikey'
    pass: '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' // tu API key
  },
  // logs útiles en Render
  logger: true,
  debug: true
});

const sendResetEmail = async (email, asunto, texto) => {
  // Asegúrate de que 'from' esté verificado en SendGrid (Single Sender)
  const info = await transporter.sendMail({
    from: 'rony893000@gmail.com',
    to: email,
    subject: asunto,
    text: texto
  });
  console.log('📧 Enviado:', info.messageId, 'accepted:', info.accepted);
  return info;
};

module.exports = sendResetEmail;
