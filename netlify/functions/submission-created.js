const nodemailer = require('nodemailer')

exports.handler = async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } }
  }

  const data = JSON.parse(event.body)
  if (!data.name || !data.email || !data['form-name']) {
    return { statusCode: 422, body: 'Name, email and job title are required.' }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: false,
      requireTLS: true,
    })

    const mailOptions = {
      from: `${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>`,
      to: data.email,
      subject: 'Application Confirmation',
      text: `Dear ${data.name},\n\nThank you for applying for the ${data['form-name']} position at Armat Analytics. We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.\n\nBest regards,\nArmat Analytics`,
    }

    await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Emails sent successfully!' }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
