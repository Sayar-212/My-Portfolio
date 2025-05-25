import nodemailer from "nodemailer";

interface SendBadgeEmailParams {
  to: string;
  name: string;
  badgeBuffer: Buffer;
}

export async function sendBadgeEmail({ to, name, badgeBuffer }: SendBadgeEmailParams) {
  try {
    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "user@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Sayar Basu" <${process.env.EMAIL_FROM || "sayar.basu@example.com"}>`,
      to,
      subject: "Thank you for visiting my profile!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #4f46e5; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank you for visiting my profile!</h1>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
              Hello ${name},
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
              Thank you for taking the time to visit my portfolio and signing in. I'm excited to share my work in AI/ML with you.
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
              As a token of appreciation, I've created a special badge for you. You can download it and share it on social media if you'd like!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 18px; font-weight: bold; color: #334155;">Your Custom Badge</p>
              <img src="cid:badge" alt="Your Custom Badge" style="max-width: 300px; border-radius: 10px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);" />
            </div>
            
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
              Feel free to reach out if you have any questions or if you'd like to discuss potential collaborations.
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; color: #334155;">
              Best regards,<br>
              Sayar Basu<br>
              AI/ML Engineer & GenAI Specialist
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 14px;">
              This is an automated email sent after visiting Sayar Basu's portfolio.
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'badge.png',
          content: badgeBuffer,
          cid: 'badge' // Same cid value as in the html img src
        }
      ]
    });

    console.log("Badge email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending badge email:", error);
    throw error;
  }
}
