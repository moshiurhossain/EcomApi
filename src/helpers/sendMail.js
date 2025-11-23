const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "1001096@daffodil.ac",
    pass: "qzok ukcf lhnf rqza",
  },
});


const sendMail = async (mailTo,sub,templete)=>{
     const info = await transporter.sendMail({
    from: '"Ecom-backend" 1001096@daffodil.ac',
    to: mailTo,
    subject: sub,
    html: templete, // HTML body
  });
}

module.exports = sendMail