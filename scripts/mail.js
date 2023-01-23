const nodemailer = require("nodemailer");

const user = process.env.MAIL_NAME;
const pass = process.env.MAIL_PASS;

console.log("user", user);

// async..await is not allowed in global scope, must use a wrapper
async function main() {
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
    from: `"${user.split("@")[0]}" <${user}>`, // sender address
    to: "ansike@qq.com", // list of receivers
    subject: "travis ci result", // Subject line
    text: "travis build done, visit detail https://app.travis-ci.com/github/ansike", // plain text body
    html: "<b>travis build done, visit detail https://app.travis-ci.com/github/ansike</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
