const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const mailSender = async (email, title, body) => {
  try {
    // Ensure the SMTP details are correct
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587, // Default port is 587 for TLS, you can change this
      secure: process.env.MAIL_PORT == 465, // Set to true if you're using port 465 for SSL
      auth: {
        user: process.env.MAIL_USER, // Sender's email credentials
        pass: process.env.MAIL_PASS, // Sender's email password or app-specific password
      },
    });

    // Send the email
    let info = await transporter.sendMail({
      from: `Studynotion | CodeHelp <${process.env.MAIL_USER}>`, // Sender address
      to: email, // List of receivers
      subject: title, // Subject line
      html: body, // HTML body
    });

    console.log(`Message sent: ${info.messageId}`); // Log success
    return info;
  } catch (error) {
    console.error(`Error while sending email: ${error.message}`); // Log error details
    return error.message;
  }
};
console.log(process.env.MAIL_HOST, process.env.MAIL_USER, process.env.MAIL_PASS);

module.exports = mailSender;
