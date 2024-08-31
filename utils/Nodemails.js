const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 597,
  auth: {
    user: "gouravpanchal80107@gmail.com",
    pass: "oodm paoa sfiz jcxg",
  },
});

module.exports = transporter;
