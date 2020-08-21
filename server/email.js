var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jude.addy999@gmail.com',
//     pass: process.env.EMAIL_PASS
//   }
// });

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'jude.addy999@gmail.com',
      pass: process.env.EMAIL_PASS
  }
});

var mailOptions = {
  from: 'jude.addy999@gmail.com',
  to: 'jude.addy999@gmail.com',
  subject: 'New Comment!',
  text: ''
};

function sendMail(msg) {
    transporter.sendMail({...mailOptions, ...{'text':msg}}, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    sendMail: sendMail
}