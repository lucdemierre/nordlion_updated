# 📧 NordLion Email Configuration

## Company Email Setup for Sending

You mentioned you have a company email! Here's how to set it up for sending emails from your NordLion application.

---

## 🔧 Option 1: Using Resend (Recommended - Easy)

**Why Resend?**
- Easy setup (5 minutes)
- Free tier: 3,000 emails/month
- No credit card required
- Great deliverability
- Built for developers

### Setup Steps:

1. **Sign up at [resend.com](https://resend.com)**

2. **Verify your domain:**
   - Add DNS records to your NordLion domain
   - Resend provides exact DNS records to copy

3. **Install Resend:**
   ```bash
   npm install resend
   ```

4. **Add to `.env.local`:**
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=noreply@nordlionauto.com
   ```

5. **Create API route** `src/app/api/send-email/route.ts`:
   ```typescript
   import { Resend } from 'resend'
   import { NextResponse } from 'next/server'

   const resend = new Resend(process.env.RESEND_API_KEY)

   export async function POST(request: Request) {
     try {
       const { to, subject, html } = await request.json()

       const { data, error } = await resend.emails.send({
         from: process.env.RESEND_FROM_EMAIL!,
         to,
         subject,
         html,
       })

       if (error) {
         return NextResponse.json({ error }, { status: 400 })
       }

       return NextResponse.json({ success: true, data })
     } catch (error) {
       return NextResponse.json(
         { error: 'Failed to send email' },
         { status: 500 }
       )
     }
   }
   ```

6. **Use in your app:**
   ```typescript
   // Example: Send welcome email on registration
   const sendWelcomeEmail = async (userEmail: string, userName: string) => {
     const response = await fetch('/api/send-email', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         to: userEmail,
         subject: 'Welcome to NordLion',
         html: `
           <div style="font-family: sans-serif; max-width: 600px;">
             <h1 style="color: #D67C3C;">Welcome to NordLion, ${userName}!</h1>
             <p>Thank you for joining us.</p>
             <a href="https://nordlionauto.com/dashboard" 
                style="background: #D67C3C; color: white; padding: 12px 24px; 
                       text-decoration: none; border-radius: 8px; display: inline-block;">
               Go to Dashboard
             </a>
           </div>
         `,
       }),
     })
     return response.json()
   }
   ```

---

## 🔧 Option 2: Using Nodemailer (Traditional SMTP)

**If you prefer to use your company email server directly.**

### Setup Steps:

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Get SMTP credentials from your email provider:**
   - Gmail: Use App Password
   - Outlook/Office365: Use app password
   - Custom domain: Get SMTP settings from hosting provider

3. **Add to `.env.local`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@nordlionauto.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=NordLion <noreply@nordlionauto.com>
   ```

4. **Create email utility** `src/lib/email.ts`:
   ```typescript
   import nodemailer from 'nodemailer'

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: false, // true for 465, false for other ports
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASSWORD,
     },
   })

   export async function sendEmail({
     to,
     subject,
     html,
   }: {
     to: string
     subject: string
     html: string
   }) {
     try {
       const info = await transporter.sendMail({
         from: process.env.SMTP_FROM,
         to,
         subject,
         html,
       })
       return { success: true, messageId: info.messageId }
     } catch (error) {
       console.error('Email error:', error)
       return { success: false, error }
     }
   }
   ```

5. **Create API route** `src/app/api/send-email/route.ts`:
   ```typescript
   import { sendEmail } from '@/lib/email'
   import { NextResponse } from 'next/server'

   export async function POST(request: Request) {
     try {
       const { to, subject, html } = await request.json()
       const result = await sendEmail({ to, subject, html })
       
       if (!result.success) {
         return NextResponse.json(
           { error: 'Failed to send email' },
           { status: 500 }
         )
       }

       return NextResponse.json({ success: true })
     } catch (error) {
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       )
     }
   }
   ```

---

## 📧 Email Templates

### 1. Welcome Email
```typescript
export const welcomeEmail = (userName: string) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', sans-serif; background: #0f0f0f; color: white; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                      border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; 
                      justify-content: center; font-size: 24px; font-weight: bold;">NL</div>
          <h1 style="color: #D67C3C; margin: 0;">Welcome to NordLion</h1>
        </div>
        
        <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
          Hi ${userName},
        </p>
        
        <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
          Thank you for joining NordLion! We're excited to help you find your dream luxury vehicle.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nordlionauto.com/dashboard" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500;">
            Go to Dashboard
          </a>
        </div>
        
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin-top: 40px; text-align: center;">
          © 2026 NordLion. All rights reserved.
        </p>
      </div>
    </body>
  </html>
`
```

### 2. Order Confirmation
```typescript
export const orderConfirmationEmail = (orderDetails: any) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', sans-serif; background: #0f0f0f; color: white; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px;">
        <h1 style="color: #D67C3C;">Order Confirmed!</h1>
        
        <p style="color: rgba(255,255,255,0.7);">Your order #${orderDetails.orderNumber} has been confirmed.</p>
        
        <div style="background: rgba(214, 124, 60, 0.1); border: 1px solid rgba(214, 124, 60, 0.2); 
                    border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">Order Details</h3>
          <p style="color: rgba(255,255,255,0.7); margin: 5px 0;">
            <strong>Vehicle:</strong> ${orderDetails.vehicle}
          </p>
          <p style="color: rgba(255,255,255,0.7); margin: 5px 0;">
            <strong>Amount:</strong> $${orderDetails.amount.toLocaleString()}
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nordlionauto.com/dashboard/orders/${orderDetails.id}" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500;">
            Track Order
          </a>
        </div>
      </div>
    </body>
  </html>
`
```

---

## 🎯 Email Use Cases

### When to Send Emails:

1. **Registration:**
   - Welcome email
   - Email verification

2. **Orders:**
   - Order confirmation
   - Order status updates
   - Delivery notifications

3. **Account:**
   - Password reset
   - Security alerts
   - Profile updates

4. **Marketing:**
   - New vehicle arrivals
   - Special offers
   - Newsletter

---

## 🚀 Quick Implementation

### Add email to registration:

In `src/app/auth/register/page.tsx`, after successful registration:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  try {
    // Your registration logic here
    // ...

    // Send welcome email
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: formData.email,
        subject: 'Welcome to NordLion',
        html: welcomeEmail(formData.firstName),
      }),
    })

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    setError('Registration failed')
  } finally {
    setIsLoading(false)
  }
}
```

---

## 📊 Recommendations

**Best Choice:**

✅ **Resend** - If you want quick setup and don't mind using a third-party service
- Easiest to implement
- Best deliverability
- Free tier is generous
- Modern API

✅ **Nodemailer** - If you want full control using your own email server
- More control
- Use your existing email
- No third-party dependencies
- Might have deliverability issues

---

## ⚠️ Important Notes

1. **Never commit email credentials to git**
   - Always use `.env.local`
   - Add `.env.local` to `.gitignore`

2. **Test emails first**
   - Use your own email for testing
   - Check spam folder

3. **Domain verification**
   - For production, verify your domain
   - Improves deliverability

4. **Rate limiting**
   - Add rate limiting to email API
   - Prevent abuse

---

## 🦁 Let's Set It Up!

**What's your company email?** (e.g., contact@nordlionauto.com)

I can help you:
1. Choose the best option (Resend vs Nodemailer)
2. Set up the exact configuration
3. Create email templates
4. Integrate with registration/orders

Just let me know your email provider and I'll give you the exact steps! 🚀
