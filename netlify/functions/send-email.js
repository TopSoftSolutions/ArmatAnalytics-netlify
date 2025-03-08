require('dotenv').config()
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export async function handler(event) {
  // Add CORS headers for browser requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
      headers: { ...headers, Allow: 'POST' },
    }
  }

  let data
  try {
    data = JSON.parse(event.body)
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON in request body' }),
    }
  }

  if (!data.name || !data.email || !data.jobTitle) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: 'Name, email and job title are required.' }),
    }
  }

  // Verify API key exists
  if (!process.env.MAILERSEND_API_KEY) {
    console.error('Missing MAILERSEND_API_KEY environment variable')
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Server configuration error',
        details: 'Missing API key',
      }),
    }
  }

  try {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    })

    const sender = new Sender(
      process.env.SENDER_EMAIL || 'no-reply@armatanalytics.com',
      process.env.SENDER_NAME || 'Armat Analytics'
    )

    const recipients = [new Recipient(data.email, data.name)]

    const isRootProgram = data.jobTitle === 'The ROOT program'
    const positionText = isRootProgram ? '' : 'position '
    // Create HTML version of the email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              border-bottom: 3px solid #0066cc;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #666666;
              border-top: 1px solid #eeeeee;
            }
            h1 {
              color: #0066cc;
            }
            .highlight {
              font-weight: bold;
              color: #0066cc;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Received</h1>
            </div>
            <div class="content">
              <p>Dear <span class="highlight">${data.name}</span>,</p>
              
              <p>Thank you for applying for the <span class="highlight">${
                data.jobTitle
              }</span> ${positionText}at Armat Analytics.</p>
              
              <p>We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.</p>
              
              <p>If you have any questions about your application, please don't hesitate to reach out to our recruitment team at <a href="mailto:hr@armatanalytics.com">hr@armatanalytics.com</a>.</p>
              
              <p>Best regards,<br>
              Armat Analytics Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Armat Analytics. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Create plain text fallback version
    const textContent = `Dear ${data.name},\n\nThank you for applying for the ${data.jobTitle} ${positionText}at Armat Analytics. We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.\n\nBest regards,\nArmat Analytics Team`

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject('Application Confirmation')
      .setHtml(htmlContent)
      .setText(textContent)

    const response = await mailerSend.email.send(emailParams)
    console.log('Email sent successfully:', response)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Email sent successfully!',
        responseId: response.headers['x-message-id'],
      }),
    }
  } catch (err) {
    console.error('Email error:', err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: err.message,
        stack: err.stack,
      }),
    }
  }
}
