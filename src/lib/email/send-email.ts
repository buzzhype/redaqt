/**
 * Send an email (mock implementation)
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text content
 * @param html HTML content
 * @returns Success status
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ success: boolean }> {
  // This is a mock implementation
  // In a real app, you would integrate with an email service like SendGrid, Mailgun, etc.
  
  console.log(`Email sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Text: ${text}`);
  
  // Simulate successful email sending
  return { success: true };
}

/**
 * Send a verification email
 * @param to Recipient email address
 * @param token Verification token
 * @param routing Routing token
 * @returns Success status
 */
export async function sendVerificationEmail(
  to: string,
  token: string,
  routing: string
): Promise<{ success: boolean }> {
  const subject = "RedaQt Account Setup";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verificationUrl = `${appUrl}/complete-registration?routing=${routing}`;
  
  const text = `
    Complete Account Setup

    Thanks for creating a RedaQt account.
    
    Your verification token is: ${token}
    
    Please use this token at ${verificationUrl} to complete your registration.
    
    This link will expire in 24 hours.
    
    Thanks,
    The RedaQt Team
  `;
  
  const html = `
    <h1>Complete Account Setup</h1>
    
    <p>Thanks for creating a RedaQt account.</p>
    
    <p>Your verification token is: <strong>${token}</strong></p>
    
    <p>Please use this token at <a href="${verificationUrl}">this link</a> to complete your registration.</p>
    
    <p>This link will expire in 24 hours.</p>
    
    <p>Thanks,<br>The RedaQt Team</p>
  `;
  
  return sendEmail({ to, subject, text, html });
}

/**
 * Send a password reset email
 * @param to Recipient email address
 * @param token Reset token
 * @returns Success status
 */
export async function sendPasswordResetEmail(
  to: string,
  token: string
): Promise<{ success: boolean }> {
  const subject = "RedaQt Password Reset";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/reset-password?token=${token}`;
  
  const text = `
    Reset Your Password

    Someone requested a password reset for your RedaQt account.
    
    If this was you, please click the link below to reset your password:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this, you can safely ignore this email.
    
    Thanks,
    The RedaQt Team
  `;
  
  const html = `
    <h1>Reset Your Password</h1>
    
    <p>Someone requested a password reset for your RedaQt account.</p>
    
    <p>If this was you, please click the link below to reset your password:</p>
    
    <p><a href="${resetUrl}">Reset Password</a></p>
    
    <p>This link will expire in 1 hour.</p>
    
    <p>If you didn't request this, you can safely ignore this email.</p>
    
    <p>Thanks,<br>The RedaQt Team</p>
  `;
  
  return sendEmail({ to, subject, text, html });
}
