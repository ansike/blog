const nodemailer = require("nodemailer");

const user = process.env.MAIL_NAME;
const pass = process.env.MAIL_PASS;

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  if (!user || !pass) {
    console.log("there is no user or pass");
    return;
  }
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user, // generated ethereal user
      pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${user}" <${user}>`, // sender address
    to: "ansike@qq.com", // list of receivers
    subject: "gh build", // Subject line
    text: "travis build done, you can visit https://ansike.github.io/blog/ to check the result and visit https://app.travis-ci.com/github/ansike to check the build detail", // plain text body
    html: "<b>travis build done.<br /> you can visit https://ansike.github.io/blog/ to check the result <br />and visit https://app.travis-ci.com/github/ansike to check the build detail</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
