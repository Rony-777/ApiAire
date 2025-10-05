// src/service/enviarCorreo.js
const nodemailer = require('nodemailer');

// Usa la env var EXACTA tal como la definiste en Render: "mail"
const SENDGRID_API_KEY = process.env.mail;
if (!SENDGRID_API_KEY) {
  throw new Error('Falta la variable de entorno "mail" con la API key de SendGrid');
}

// Transporter SMTP por 2525 (evita bloqueos de 465/587)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 2525,
  secure: false,                 // STARTTLS en 2525
  auth: {
    user: 'apikey',              // literal 'apikey'
    pass: SENDGRID_API_KEY       // tu API key desde process.env.mail
  },
  // (opcional) logs útiles en Render:
  // logger: true,
  // debug: true
});

async function sendResetEmail(to, subject, text) {
  const info = await transporter.sendMail({
    from: 'rony893000@gmail.com',  // Debe ser un remitente verificado en SendGrid (Single Sender)
    to,
    subject,
    text
  });
  return info;
}

module.exports = sendResetEmail;
