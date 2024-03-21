const fs = require("fs");
const path = require("path");
const transporter = require("./config");

const sendRecoveryCode = async (to, code) => {
  try {
    const htmlFilePath = path.resolve("./src/email/templates/recovery.html");
    const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");
    const personalizedHtmlContent = htmlContent.replace("{{code}}", code);
    const response = await transporter.sendMail({
      from: `"Mapi" <noreply@mapi.com>`,
      to,
      subject: "Recuperar contraseña en Mapi",
      html: personalizedHtmlContent,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { sendRecoveryCode };
