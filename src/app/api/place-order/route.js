import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Solar Order" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_EMAIL,
    subject: "New Solar System Order",
    html: `
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${body.customer.name} </p>
      <p><strong>Phone:</strong> ${body.customer.phone}</p>
      <p><strong>Address:</strong> ${body.customer.address}</p>

      <h3>Order Summary</h3>
      <p>Panel: ${body.panel.name} ${body.panel.watt}W (${body.panel.quantity} pcs)</p>
      <p>Inverter: ${body.inverter.name} (${body.inverter.quantity} pcs)</p>
      <p><strong>Total:</strong> PKR ${body.total}</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  return Response.json({ success: true });
}
