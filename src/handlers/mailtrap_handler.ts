import nodemailer from 'nodemailer';
import { approvedTemplate } from '../emailTemplates/approved';
import { declinedTemplate } from '../emailTemplates/declined';
import { gatewayFailureTemplate } from '../emailTemplates/gatewayerror';

export const sendConfirmationEmail = async (toEmail: string, subject: string, htmlContent: string)=> {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b960896bb4ead3",
      pass: "c4f43f67a843cb"
    }
  });

  const mailOptions = {
    from: '"Your Shop" <noreply@yourshop.com>',
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

    const ApprovedTemplate = gatewayFailureTemplate(customerName,Date.now.toString());

    await sendConfirmationEmail(gmail,subject, ApprovedTemplate);
}
