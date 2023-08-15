const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const sendMail = async (option) => {
  console.log("start send");

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: "gmail",
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const imagePath = path.join(__dirname, "../../uploads", "logo.png");
  const imageContent = fs.readFileSync(imagePath, { encoding: "base64" });

  const htmlImage = `<img src="data:image/jpeg;base64,${imageContent}" 
  alt="Image" style="display: block; margin-top: 20px;">`;
  const mailOption = {
    from: process.env.SMPT_MAIL,
    to: option.email,
    subject: option.subject,
    html: option.message + htmlImage,
    attachments: [option.attachment]
  };

  await transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
