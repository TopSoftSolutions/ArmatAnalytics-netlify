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

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject('Application Confirmation')
      .setHtml(
        `Dear ${data.name},\n\nThank you for applying for the ${data.jobTitle} position at Armat Analytics. We have received your application and will review it shortly. If your qualifications match our needs, we will contact you for the next steps.\n\nBest regards,\nArmat Analytics`
      )

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
