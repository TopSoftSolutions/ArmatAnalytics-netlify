
require('dotenv').config()
const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_SENDER_NAME, SMTP_SENDER_EMAIL } = process.env
import { createTransport } from 'nodemailer'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } }
  }

  const data = JSON.parse(event.body)
  if (!data.name || !data.email || !data.jobTitle) {
    return { statusCode: 422, body: 'Name, email and job title are required.' }
  }

  try {
    const transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
      secure: false,
      requireTLS: true,
    })

    const mailOptions = {
      from: `${SMTP_SENDER_NAME} <${SMTP_SENDER_EMAIL}>`,
      to: data.email,
      subject: 'Application Confirmation',
      text: `Dear ${data.name},\n\nThank you for applying for the ${data.jobTitle} position at Armat Analytics. We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.\n\nBest regards,\nArmat Analytics`,
    }

    // await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully!' }),
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
