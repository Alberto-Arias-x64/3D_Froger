const { promiseImpl } = require("ejs");
const nodemailer = require("nodemailer");
require('dotenv').config('../.env')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: '587',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.send_mail = async correo => {
  return new Promise((resolve,reject) =>{
    // send mail with defined transport object
    let info ={
      from: 'froger3d@gmail.com', // sender address
      to: correo.destino || 'froger3d@gmail.com', // list of receivers
      subject: correo.asunto, // Subject line
      text: correo.texto, // plain text body
      html: correo.html, // html body
    };

    transporter.sendMail(info,(err,data)=>{
      if(err){
        resolve('ERROR')
      }
      else{
        resolve('SEND')
      }
    })
  })
}