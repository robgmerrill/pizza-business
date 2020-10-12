const nodemailer = require('nodemailer');

// create a transfort for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // Test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: 'orders@examples.com',
    subject: 'New Order',
    html: `<p>Your new pizza order is here!</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
