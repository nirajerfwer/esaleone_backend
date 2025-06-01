import nodemailer from 'nodemailer';
import { approvedTemplate } from '../emailTemplates/approved';
import { declinedTemplate } from '../emailTemplates/declined';
import { gatewayFailureTemplate } from '../emailTemplates/gatewayerror';

require("dotenv").config();

export const sendConfirmationEmail = async (toEmail: string, subject: string, htmlContent: string)=> {
  
  const transporter = nodemailer.createTransport({
    host: process.env.smtphost || "sandbox.smtp.mailtrap.io",
    port: Number(process.env.smtpport) || 2525,
    auth: {
      user: process.env.mailtrapuser,
      pass: process.env.mailtrappassword
    }
  });

  const mailOptions = {
    from: '"EsaleOne" <noreply@eSaleOne.com>',
    to: toEmail,
    subject,
    html: htmlContent,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: ", info.messageId);
}

export const sendApprovedMail = async(customerName:string,OrderDetails:any,gmail:any)=>{
     const subject = "Your Transaction Confiremed"
    const ApprovedTemplate = approvedTemplate(customerName,OrderDetails._id,OrderDetails.Products,OrderDetails.Totalprice);

    await sendConfirmationEmail(gmail,subject, ApprovedTemplate);
}
export const sendDeclineMail = async(customerName:string,gmail:any)=>{
     const subject = "Your Transaction Declined"

    const ApprovedTemplate = declinedTemplate(customerName);

    await sendConfirmationEmail(gmail,subject, ApprovedTemplate);
}
export const sendGatewayFailurMail = async(customerName:string,gmail:any)=>{
     const subject = "Gateway faiure"
const now = new Date(Date.now());
const formatted = now.toISOString().slice(0, 10);
    const ApprovedTemplate = gatewayFailureTemplate(customerName,formatted);

    await sendConfirmationEmail(gmail,subject, ApprovedTemplate);
}
