// src/sendResetEmail.js
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // prioriza IPv4, evita timeouts por IPv6

const nodemailer = require('nodemailer');

function makeTransport({ port, secure }) {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port,                 // 587 (STARTTLS) o 465 (TLS)
    secure,               // false para 587, true para 465
    auth: {
      user: 'rony893000@gmail.com',
      pass: 'qkfi yjpu qabu khmv' // pon tu contraseña de aplicación
    },
    // timeouts más cortos para no colgarte
    connectionTimeout: 12000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    // SNI correcto
    tls: { servername: 'smtp.gmail.com', rejectUnauthorized: true },
    // logs útiles en Render
    logger: true,
    debug: true
  });
}

async function sendResetEmail(email, asunto, texto) {
  // 1) intenta 587 (STARTTLS) como en tu código original
  let transporter = makeTransport({ port: 587, secure: false });
  try {
    await transporter.verify(); // prueba conexión y EHLO
  } catch (e587) {
    // 2) si hay timeout/conexión fallida, cae a 465 (TLS)
    transporter = makeTransport({ port: 465, secure: true });
    await transporter.verify();
  }

  const info = await transporter.sendMail({
    from: { name: 'Calidad del Aire', address: 'rony893000@gmail.com' },
    to: email,
    subject: asunto,
    text: texto
  });

  console.log('📧 Enviado:', info.messageId, 'accepted:', info.accepted);
  return info;
}

module.exports = sendResetEmail;
