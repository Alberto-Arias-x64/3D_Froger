const nodemailer = require('nodemailer');
const config = require('../config/index');

module.exports = sendMail = (email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "outlook",
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "temp_user", 
        pass: "temp_password",
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
  
    const text = `Please verify your account by click the following link: <br><br> <a href=127.0.0.1/verifyEmail/${email}/${verificationToken}>`;
    const html = "";
  
    await transporter.sendMail({
      from: "tempmail@outlook.com", // sender address
      to: email,
      subject: "Recuperacion de contraseña", // Subject line
      text: text, 
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    console.log(`Error sending the email => ${error}`);
  }
};