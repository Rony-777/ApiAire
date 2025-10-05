// src/sendgrid-smtp.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 2525,          // suele estar abierto en PaaS
  secure: false,
  auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY }
});

(async () => {
  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: 'TU_CORREO_VERIFICADO@ejemplo.com', // Single Sender o dominio verificado
      to: 'destino@correo.com',
      subject: 'Prueba SMTP 2525',
      text: 'Hola desde SendGrid SMTP (2525).'
    });
    console.log('✅ Enviado:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP error:', err.response?.body || err.message);
    process.exit(1);
  }
})();
