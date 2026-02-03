# 📧 cPanel Email Setup for NordLion

## Your Domain: nordlionauto.com

Since you're using cPanel, here's how to set up email sending from your NordLion application.

---

## ✅ Step 1: Create Email Account in cPanel

1. **Login to cPanel** at your hosting provider
2. Go to **"Email Accounts"**
3. Click **"Create"**
4. Create email:
   - **Email:** `noreply@nordlionauto.com`
   - **Password:** Choose a strong password
   - **Mailbox Quota:** 250 MB (sufficient)
5. Click **"Create"**

---

## 🔧 Step 2: Get SMTP Settings

In cPanel, after creating the email, you'll see:

**SMTP Settings:**
- **Incoming Server:** `mail.nordlionauto.com`
- **SMTP Server:** `mail.nordlionauto.com`
- **SMTP Port:** `587` (recommended) or `465` (SSL)
- **Username:** `noreply@nordlionauto.com`
- **Password:** [your email password]
- **Authentication:** Required
- **Encryption:** TLS (for 587) or SSL (for 465)

---

## 📦 Step 3: Install Dependencies

```bash
cd /c/xampp/htdocs/nordlion_updated
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## 🔐 Step 4: Configure Environment Variables

1. **Copy `.env.example` to `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your actual credentials:**
   ```env
   SMTP_HOST=mail.nordlionauto.com
   SMTP_PORT=587
   SMTP_USER=noreply@nordlionauto.com
   SMTP_PASSWORD=your_actual_password_here
   SMTP_FROM=NordLion <noreply@nordlionauto.com>
   
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

---

## 📧 Step 5: Email Sending is Ready!

The code is already set up! Here's what's included:

### Email Utility (`src/lib/email.ts`):
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for 587
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

### API Route (`src/app/api/send-email/route.ts`):
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

## 🎨 Email Templates

Orange-themed templates are ready in `src/lib/emailTemplates.ts`:

1. **Welcome Email** - When user registers
2. **Order Confirmation** - When order is placed
3. **Password Reset** - When user requests password reset
4. **Order Status Update** - When order status changes

---

## 🧪 Test Your Email Setup

Create a test file `test-email.ts` in the root:

```typescript
import { sendEmail } from './src/lib/email'

async function testEmail() {
  const result = await sendEmail({
    to: 'your-email@example.com', // Your personal email for testing
    subject: 'NordLion Email Test',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; background: #1a1a1a; padding: 40px; border-radius: 16px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                    border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; 
                    justify-content: center; font-size: 24px; font-weight: bold; color: white;">NL</div>
        <h1 style="color: #D67C3C; text-align: center;">Email Test Successful!</h1>
        <p style="color: rgba(255,255,255,0.7);">Your NordLion email system is working perfectly!</p>
      </div>
    `,
  })

  console.log('Email result:', result)
}

testEmail()
```

Run it:
```bash
npx tsx test-email.ts
```

---

## 🚀 Usage in Your App

### Send Welcome Email on Registration:

In `src/app/auth/register/page.tsx`:

```typescript
import { welcomeEmail } from '@/lib/emailTemplates'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  // ... registration logic ...

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

  router.push('/dashboard')
}
```

### Send Order Confirmation:

```typescript
import { orderConfirmationEmail } from '@/lib/emailTemplates'

const placeOrder = async (orderDetails) => {
  // ... order logic ...

  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: user.email,
      subject: `Order Confirmed #${orderDetails.orderNumber}`,
      html: orderConfirmationEmail(orderDetails),
    }),
  })
}
```

---

## ⚠️ Troubleshooting

### Issue: Connection timeout
**Solution:** Check if your hosting allows outgoing SMTP. Some hosts block port 587. Try port 465 instead:
```env
SMTP_PORT=465
```
And in `src/lib/email.ts` change:
```typescript
secure: true, // for port 465
```

### Issue: Authentication failed
**Solution:** 
1. Double-check email and password in `.env.local`
2. Make sure email account exists in cPanel
3. Try recreating the email account

### Issue: Emails go to spam
**Solution:**
1. In cPanel, set up SPF record
2. Set up DKIM in cPanel Email Deliverability
3. Add DMARC record
4. Use a professional "From" name like `NordLion <noreply@nordlionauto.com>`

---

## 📊 Email Limits

Most cPanel hosting has limits:
- **Per hour:** ~50-100 emails
- **Per day:** ~500-1000 emails

For high volume (>1000/day), consider:
- Upgrading hosting plan
- Using Resend/SendGrid alongside cPanel for high-priority emails

---

## ✅ Quick Setup Checklist

- [ ] Create `noreply@nordlionauto.com` in cPanel
- [ ] Note down SMTP settings from cPanel
- [ ] Install nodemailer: `npm install nodemailer @types/nodemailer`
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add your SMTP credentials to `.env.local`
- [ ] Test with test-email.ts
- [ ] Integrate with registration/orders
- [ ] Check spam folder for test emails
- [ ] Set up SPF/DKIM in cPanel (optional but recommended)

---

## 🎯 You're All Set!

Your NordLion can now send:
- ✅ Welcome emails
- ✅ Order confirmations
- ✅ Password resets
- ✅ Status updates
- ✅ Marketing emails

All using your professional `@nordlionauto.com` email! 🦁🔥
