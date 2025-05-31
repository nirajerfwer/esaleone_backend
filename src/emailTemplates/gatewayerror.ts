export const gatewayFailureTemplate = (customerName: string, date?: string) => {
  return `<div style="font-family: Arial, sans-serif; border: 1px solid #ff9800; padding: 20px; border-radius: 8px; background-color: #fff8e1;">
    <h2 style="color: #ef6c00;">⚠ Gateway Error</h2>
    <p>Hi <strong>${customerName}</strong>,</p>
    <p>We encountered a technical issue while processing your payment${date ? ` on <strong>${date}</strong>` : ""}.</p>
    <p>Please try again after some time or contact your bank.</p>
    <p>If the problem continues, reach out to us at <a href="mailto:support@eSaleOne.com">support@eSaleOne.com</a>.</p>
    <p>Regards,<br/><strong>eSaleOne Team</strong></p>
  </div>
`}
