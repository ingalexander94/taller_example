const nodemailer = require("nodemailer");
const envs = require("../config/environments");

const transporter = nodemailer.createTransport({
  host: envs.EMAIL_HOST,
  port: envs.EMAIL_PORT,
  secure: true,
  auth: {
    user: envs.EMAIL_USER,
    pass: envs.EMAIL_PASSWORD,
  },
});

transporter
  .verify()
  .then(() => console.log("Email server is online"))
  .catch(console.error);

module.exports = transporter;
