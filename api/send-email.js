import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message, subject, attachments } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message content is required" });
  }

  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.RECIPIENT_EMAIL
  ) {
    return res.status(500).json({
      message: "Email environment variables are not configured",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL, // 🔒 ALWAYS FROM ENV
    subject: subject || "New Enrollment Application",
    text: message,
    attachments: attachments
      ? attachments.map((att) => ({
          filename: att.filename,
          content: att.content,
          encoding: "base64",
        }))
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
}
