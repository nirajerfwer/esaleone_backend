import {
  sendApprovedMail,
  sendDeclineMail,
  sendGatewayFailurMail,
} from "./mailtrap_handler";

export const handlerEmails = async (checkout: any) => {
  try {
    await sendApprovedMail(
      checkout.checkout.fullName,
      checkout.order,
      checkout.checkout.email
    );
    setTimeout(async () => {
      await sendDeclineMail(
        checkout.checkout.fullName,
        checkout.checkout.email
      );
    }, 3000); // will

    setTimeout(async () => {
      await sendGatewayFailurMail(
        checkout.checkout.fullName,
        checkout.checkout.email
      );
    }, 4000); // will
  } catch (err) {
    console.log("error while handling email", err);
    throw new Error(`${err}`);
  }
};
