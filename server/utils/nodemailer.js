const nodemailer = require('nodemailer');

const { EMAIL_SMTP_USER, EMAIL_SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
});

module.exports = transporter;