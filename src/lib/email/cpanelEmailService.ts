// cPanel Email Service Integration
// Uses SMTP through cPanel webmail

import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    path?: string
    content?: string
  }>
}

class CPanelEmailService {
  private transporter: any

  constructor() {
    this.initializeTransporter()
  }

  private initializeTransporter() {
    // cPanel SMTP configuration
    this.transporter = nodemailer.createTransporter({
      host: process.env.CPANEL_SMTP_HOST || 'mail.nordlionauto.com',
      port: parseInt(process.env.CPANEL_SMTP_PORT || '465'),
      secure: true, // Use SSL
      auth: {
        user: process.env.CPANEL_EMAIL_USER, // Your cPanel email
        pass: process.env.CPANEL_EMAIL_PASSWORD, // Your cPanel email password
      },
      tls: {
        rejectUnauthorized: false // For self-signed certificates
      }
    })
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const mailOptions = {
        from: `${process.env.CPANEL_EMAIL_FROM_NAME || 'NordLion Auto'} <${process.env.CPANEL_EMAIL_USER}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
        replyTo: process.env.CPANEL_EMAIL_REPLY_TO || process.env.CPANEL_EMAIL_USER,
      }

      const info = await this.transporter.sendMail(mailOptions)

      return {
        success: true,
        messageId: info.messageId,
      }
    } catch (error: any) {
      console.error('Email send error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Pre-built email templates
  async sendOrderConfirmation(order: any) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D67C3C; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; }
            .button { display: inline-block; padding: 12px 30px; background: #D67C3C; color: white; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed!</h1>
            </div>
            <div class="content">
              <h2>Thank you for your order</h2>
              <p>Order Number: <strong>#${order.orderNumber}</strong></p>
              <p>Vehicle: <strong>${order.vehicle}</strong></p>
              <p>Total: <strong>$${order.price.toLocaleString()}</strong></p>
              <p>We'll keep you updated on your order status.</p>
              <a href="https://nordlionauto.com/client/orders" class="button">View Order</a>
            </div>
            <div class="footer">
              <p>NordLion Auto - Luxury Vehicle Specialists</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: order.customerEmail,
      subject: `Order Confirmation #${order.orderNumber}`,
      html,
    })
  }

  async sendInquiryResponse(inquiry: any) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D67C3C; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>We've Received Your Inquiry</h1>
            </div>
            <div class="content">
              <p>Dear ${inquiry.name},</p>
              <p>Thank you for your interest in the <strong>${inquiry.vehicle}</strong>.</p>
              <p>Our team will review your inquiry and get back to you within 24 hours.</p>
              <p>In the meantime, feel free to explore our inventory or contact us directly.</p>
            </div>
            <div class="footer">
              <p>NordLion Auto</p>
              <p>Email: ${process.env.CPANEL_EMAIL_USER}</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: inquiry.email,
      subject: `Inquiry Received - ${inquiry.vehicle}`,
      html,
    })
  }

  async sendWelcomeEmail(user: any) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D67C3C; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; }
            .button { display: inline-block; padding: 12px 30px; background: #D67C3C; color: white; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to NordLion Auto!</h1>
            </div>
            <div class="content">
              <p>Dear ${user.firstName},</p>
              <p>Thank you for joining NordLion Auto, your premier destination for luxury vehicles.</p>
              <p>Your account has been created successfully. You can now:</p>
              <ul>
                <li>Browse our exclusive inventory</li>
                <li>Save vehicles to your wishlist</li>
                <li>Track your orders</li>
                <li>Manage your documents</li>
              </ul>
              <a href="https://nordlionauto.com/client" class="button">Go to Dashboard</a>
            </div>
            <div class="footer">
              <p>NordLion Auto - Luxury Vehicle Specialists</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({
      to: user.email,
      subject: 'Welcome to NordLion Auto',
      html,
    })
  }
}

export const cpanelEmailService = new CPanelEmailService()

// Export helper functions
export async function sendOrderConfirmationEmail(order: any) {
  return cpanelEmailService.sendOrderConfirmation(order)
}

export async function sendInquiryResponseEmail(inquiry: any) {
  return cpanelEmailService.sendInquiryResponse(inquiry)
}

export async function sendWelcomeEmail(user: any) {
  return cpanelEmailService.sendWelcomeEmail(user)
}
