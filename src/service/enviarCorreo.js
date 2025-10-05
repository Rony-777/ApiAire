const nodemailer = require('nodemailer');

const sendResetEmail = async (email, asunto, texto) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,          // STARTTLS
    secure: false,      // true solo con 465
    auth: {
      user: 'rony893000@gmail.com',
      pass: 'kcjhfjkyspjdehvl'   // Debe ser "Contraseña de aplicación"
    },
    logger: true,       // logs SMTP a consola
    debug: true
  });

  try {
    await transporter.verify();   // prueba conexión/credenciales
    const info = await transporter.sendMail({
      from: { name: 'Calidad del Aire', address: 'rony893000@gmail.com' },
      to: email,
      subject: asunto,
      text: texto
    });
    console.log('📧 Enviado:', info.messageId, 'accepted:', info.accepted);
  } catch (err) {
    console.error('❌ MAIL ERROR:', {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      response: err.response,
      message: err.message
    });
    throw err; // para que lo veas en los logs de Render
  }
};

module.exports = sendResetEmail;
