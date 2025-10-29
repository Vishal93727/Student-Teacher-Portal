import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail=async(to,subject,htmlContent)=>{
  try {
    const transporter=nodrmailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  });
  await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to,
    subject,
    html:htmlContent
  });
  console.log('send email successfully.....')
  } catch (error) {
    console.error(error.message);
  }
};
export default sendEmail;