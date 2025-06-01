import nodemailer from "nodemailer";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const sendNodemailer = catchAsyncErrors(
  async (req: NextRequest, res: NextResponse) => {
    const body = await req.json();
    const { name, email, message } = body;

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // Send mail
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: message,
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style type="text/css">
        /* Client-specific styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Main styles */
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.5; color: #333333; }
        .email-container { max-width: 600px; margin: 0 auto; }
        .header { background-color: #4f46e5; padding: 30px 20px; text-align: center; }
        .header-title { color: #ffffff; font-size: 24px; font-weight: bold; }
        .content { padding: 30px 20px; background-color: #ffffff; }
        .info-card { background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 20px; }
        .info-row { margin-bottom: 12px; }
        .label { font-weight: 600; color: #4f46e5; display: inline-block; width: 80px; }
        .message-content { background-color: #f8f9fa; border-left: 3px solid #4f46e5; padding: 12px 15px; margin-top: 15px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #6b7280; background-color: #f3f4f6; }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container { width: 100% !important; }
            .info-row { display: block !important; }
            .label { display: block !important; width: auto !important; margin-bottom: 4px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <!-- Email Container -->
    <table class="email-container" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <!-- Header -->
        <tr>
            <td class="header">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <div class="header-title">New Contact Form Submission from ${name}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td class="content">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <div class="info-card">
                                <div class="info-row">
                                    <span class="label">Sender name:</span>
                                    <span>${name}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Sender email:</span>
                                    <span><a href="mailto:${email}">${email}</a></span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Date:</span>
                                    <span>${new Date().toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div class="message-content">
                                <div style="font-weight: 600; color: #4f46e5; margin-bottom: 8px;">Message:</div>
                                <div>${message.replace(/\n/g, "<br>")}</div>
                            </div>
                            
                            <div style="margin-top: 25px; text-align: center;">
                                <a href="mailto:${email}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 500;">Reply to ${name.split(" ")[0]}</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td class="footer">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <p style="margin: 0;">© ${new Date().getFullYear()} Fullstack developer. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;">This email was sent from my <a href="https://www.khemrajneupane.com/">website's</a> contact form.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`,
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error sending email" },
        { status: 500 }
      );
    }
  }
);
