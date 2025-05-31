export const declinedTemplate = (customerName: string, reason?: string) => {
  return `
    <div style="font-family: Arial, sans-serif; border: 1px solid #f44336; padding: 20px; border-radius: 8px; background-color: #fff0f0;">
    <h2 style="color: #c62828;"> Payment Declined</h2>
    <p>Hi <strong>${customerName}</strong>,</p>
    <p>Unfortunately, your payment was declined.</p>
    ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
    <p>Please try again or use a different payment method.</p>
    <p>If you need assistance, contact <a href="mailto:support@yourshop.com">support@yourshop.com</a>.</p>
    <p>Regards,<br/><strong>YourShop Team</strong></p>
  </div>
`;
};
