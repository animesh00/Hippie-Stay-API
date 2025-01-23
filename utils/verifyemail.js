import mjml2html from 'mjml';
import nodemailer from 'nodemailer';

/**
 * Generates MJML and converts it to HTML
 */
const generateEmailTemplate = (name, verificationLink) => {
  const mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-title>Verify Your Email</mj-title>
    <mj-font name="Helvetica" href="https://fonts.googleapis.com/css?family=Helvetica"/>
    <mj-attributes>
      <mj-text align="center" font-family="Helvetica, Arial, sans-serif"/>
      <mj-all border-radius="4px"/>
    </mj-attributes>
    <mj-style>
      .title {
        color: #f45e43;
        font-size: 20px;
        padding: 20px;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        color: #555;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f0f0f0">
    <mj-section>
      <mj-column>
        <mj-text mj-class="title">Hello, ${name}!</mj-text>
        <mj-text mj-class="content">Please verify your email address by clicking the link below:</mj-text>
        <mj-button background-color="#1a82e2" href="${verificationLink}">Verify Email</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
  return mjml2html(mjmlTemplate).html;
};

/**
 * Sends the verification email
 */
const sendVerificationEmail = async (email, name, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change the service as per your requirement
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Change this to your email
    to: email,
    subject: 'Please verify your email',
    html: generateEmailTemplate(name, verificationLink)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

export { sendVerificationEmail };

