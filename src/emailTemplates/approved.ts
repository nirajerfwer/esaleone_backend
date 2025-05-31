export const approvedTemplate = (customerName:string,orderId: string, products: any[], total: number) => {
  const productList = products.map(p => `
    <li style="margin-bottom: 8px; font-size: 14px;">
      <strong>${p.title}</strong><br/>
      <span style="color: #555;">Size:</span> ${p.size} &nbsp;|&nbsp;
      <span style="color: #555;">Color:</span> ${p.color} &nbsp;|&nbsp;
      <span style="color: #555;">Qty:</span> ${p.quantity} &nbsp;|&nbsp;
      <span style="color: #555;">Price:</span> ₹${p.price}
    </li>
  `).join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2e7d32;">✅ Order Confirmation – Order #${orderId}</h2>
      <p>Hi <strong>${customerName}</strong>,</p>
      <p>Thank you for your purchase! Your order has been confirmed with the following details:</p>

      <ul style="list-style-type: none; padding: 0; margin-top: 15px; margin-bottom: 15px;">
        ${productList}
      </ul>

      <p style="font-size: 16px; margin-top: 10px;"><strong>Total Amount Paid:</strong> ₹${total.toFixed(2)}</p>

      <p>You will receive another email once your items are shipped.</p>
      <br/>
      <p>Regards,<br/><strong>YourShop Team</strong></p>
    </div>
  `;
};
