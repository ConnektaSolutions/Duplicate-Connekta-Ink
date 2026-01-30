/* eslint-disable no-undef */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message, subject, attachments } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message content is required" });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RECIPIENT_EMAIL) {
    console.error("Missing environment variables");
    return res.status(500).json({
      message: "Email environment variables are not configured",
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: [process.env.RECIPIENT_EMAIL],
      subject: subject || "New Enrollment Application",
      text: message,
      attachments: attachments
        ? attachments.map((att) => ({
            filename: att.filename,
            content: Buffer.from(att.content, "base64"),
          }))
        : [],
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({
        message: "Failed to send email",
        error: error.message || error,
      });
    }

    return res.status(200).json({ message: "Email sent successfully", data });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
}