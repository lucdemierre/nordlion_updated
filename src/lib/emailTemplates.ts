export const welcomeEmail = (userName: string) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f0f; color: white; padding: 40px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                      border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; 
                      justify-content: center; font-size: 24px; font-weight: bold;">NL</div>
          <h1 style="color: #D67C3C; margin: 0; font-size: 28px; font-weight: 600;">Welcome to NordLion</h1>
        </div>
        
        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 20px 0;">
          Hi ${userName},
        </p>
        
        <p style="color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 15px; margin: 20px 0;">
          Thank you for joining NordLion! We're excited to help you find your dream luxury vehicle. Our platform offers exclusive access to the finest automobiles from around the world.
        </p>
        
        <div style="background: rgba(214, 124, 60, 0.1); border: 1px solid rgba(214, 124, 60, 0.2); border-radius: 12px; padding: 20px; margin: 25px 0;">
          <h3 style="color: #D67C3C; margin: 0 0 10px 0; font-size: 16px;">What's Next?</h3>
          <ul style="color: rgba(255,255,255,0.7); margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Browse our exclusive inventory</li>
            <li>Save your favorite vehicles to wishlist</li>
            <li>Get personalized recommendations</li>
            <li>Track your orders in real-time</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nordlionauto.com/dashboard" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500; font-size: 15px;">
            Go to Dashboard
          </a>
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 30px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">
            Need help? Contact us at <a href="mailto:support@nordlionauto.com" style="color: #D67C3C; text-decoration: none;">support@nordlionauto.com</a>
          </p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0;">
            © 2026 NordLion. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
`

export const orderConfirmationEmail = (orderDetails: {
  orderNumber: string
  vehicle: string
  amount: number
  id: string
}) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f0f; color: white; padding: 40px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                      border-radius: 12px; margin: 0 auto 20px;"></div>
          <h1 style="color: #D67C3C; margin: 0; font-size: 28px; font-weight: 600;">Order Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">Order #${orderDetails.orderNumber}</p>
        </div>
        
        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 20px 0;">
          Thank you for your order! Your purchase has been confirmed and is being processed.
        </p>
        
        <div style="background: rgba(214, 124, 60, 0.1); border: 1px solid rgba(214, 124, 60, 0.2); 
                    border-radius: 12px; padding: 20px; margin: 25px 0;">
          <h3 style="color: white; margin: 0 0 15px 0; font-size: 16px;">Order Details</h3>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="color: rgba(255,255,255,0.6);">Vehicle:</span>
            <span style="color: white; font-weight: 500;">${orderDetails.vehicle}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="color: rgba(255,255,255,0.6);">Order Number:</span>
            <span style="color: white;">#${orderDetails.orderNumber}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 0; margin-top: 10px;">
            <span style="color: rgba(255,255,255,0.8); font-size: 18px;">Total Amount:</span>
            <span style="color: #D67C3C; font-size: 20px; font-weight: 600;">$${orderDetails.amount.toLocaleString()}</span>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nordlionauto.com/dashboard/orders/${orderDetails.id}" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500; font-size: 15px; margin-right: 10px;">
            Track Order
          </a>
          <a href="https://nordlionauto.com/dashboard/orders/${orderDetails.id}/invoice" 
             style="background: rgba(255,255,255,0.1); color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500; font-size: 15px;">
            View Invoice
          </a>
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 30px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">
            Questions? Contact us at <a href="mailto:support@nordlionauto.com" style="color: #D67C3C; text-decoration: none;">support@nordlionauto.com</a>
          </p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0;">
            © 2026 NordLion. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
`

export const passwordResetEmail = (resetLink: string, userName: string) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f0f; color: white; padding: 40px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                      border-radius: 12px; margin: 0 auto 20px;"></div>
          <h1 style="color: #D67C3C; margin: 0; font-size: 28px; font-weight: 600;">Reset Your Password</h1>
        </div>
        
        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 20px 0;">
          Hi ${userName},
        </p>
        
        <p style="color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 15px; margin: 20px 0;">
          We received a request to reset your password. Click the button below to create a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500; font-size: 15px;">
            Reset Password
          </a>
        </div>
        
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 20px 0;">
          This link will expire in 1 hour for security reasons.
        </p>
        
        <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; margin: 20px 0;">
          If you didn't request a password reset, please ignore this email or contact support if you have concerns.
        </p>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 30px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">
            Need help? Contact us at <a href="mailto:support@nordlionauto.com" style="color: #D67C3C; text-decoration: none;">support@nordlionauto.com</a>
          </p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0;">
            © 2026 NordLion. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
`

export const orderStatusEmail = (
  orderNumber: string,
  status: string,
  statusMessage: string,
  orderId: string
) => `
  <!DOCTYPE html>
  <html>
    <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0f0f0f; color: white; padding: 40px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 16px; padding: 40px; border: 1px solid rgba(255, 255, 255, 0.05);">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #D67C3C, #B85A1F); 
                      border-radius: 12px; margin: 0 auto 20px;"></div>
          <h1 style="color: #D67C3C; margin: 0; font-size: 28px; font-weight: 600;">Order Update</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">Order #${orderNumber}</p>
        </div>
        
        <div style="background: rgba(214, 124, 60, 0.1); border: 1px solid rgba(214, 124, 60, 0.2); 
                    border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">
            Current Status
          </p>
          <p style="color: #D67C3C; font-size: 24px; font-weight: 600; margin: 0;">
            ${status}
          </p>
        </div>
        
        <p style="color: rgba(255,255,255,0.7); line-height: 1.8; font-size: 15px; margin: 20px 0; text-align: center;">
          ${statusMessage}
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nordlionauto.com/dashboard/orders/${orderId}" 
             style="background: #D67C3C; color: white; padding: 14px 32px; text-decoration: none; 
                    border-radius: 12px; display: inline-block; font-weight: 500; font-size: 15px;">
            View Order Details
          </a>
        </div>
        
        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding-top: 30px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 10px 0;">
            Questions? Contact us at <a href="mailto:support@nordlionauto.com" style="color: #D67C3C; text-decoration: none;">support@nordlionauto.com</a>
          </p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0;">
            © 2026 NordLion. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
`
