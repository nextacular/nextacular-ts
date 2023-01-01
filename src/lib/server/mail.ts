import nodemailer from 'nodemailer';

export const emailConfig = {
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  service: process.env.EMAIL_SERVICE,
};

const transporter = nodemailer.createTransport(emailConfig);

interface EmailProps {
  from?: string;
  html: string;
  subject: string;
  text: string;
  to: string;
}


export const sendMail = async ({ from, html, subject, text, to }: EmailProps) => {
  const data = {
    from: from ?? process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  };

  process.env.NODE_ENV === 'production'
    ? await transporter.sendMail(data)
    : console.log(data);
};

export default transporter;
