// src/mail-test-render.js
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // evita IPv6

const nodemailer = require('nodemailer');

(async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,            // TLS directo
    secure: true,         // obligatorio con 465
    auth: {
      user: 'rony893000@gmail.com',
      pass: 'qkfi yjpu qabu khmv'   // contraseña de aplicación (16 chars)
    },
    tls: { servername: 'smtp.gmail.com' }, // SNI explícito
    connectionTimeout: 15000,
    socketTimeout: 20000,
    logger: true,
    debug: true
  });

  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: { name: 'Calidad del Aire', address: 'rony893000@gmail.com' },
      to: 'destino@correo.com',
      subject: 'Prueba desde Render (465)',
      text: 'Hola, probando envío SMTP desde Render.'
    });
    console.log('📧 Enviado:', info.messageId, 'accepted:', info.accepted);
  } catch (err) {
    console.error('❌ MAIL ERROR:', {
      code: err.code, command: err.command, responseCode: err.responseCode,
      response: err.response, message: err.message
    });
    process.exit(1);
  }
})();
