// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const users = [
  { email: 'acederajustinn@gmail.com', password: 'Admin123' }, // 👈 hardcoded credentials
];

// Simple in-memory store for 2FA codes
const verificationCodes = new Map<string, string>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes.set(email, code);

  // Setup email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"CutLine App" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Your CutLine Verification Code',
      text: `Your verification code is: ${code}`,
    });

    res.status(200).json({ message: 'Verification code sent', email });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send verification code' });
  }
}

// Export the map to be reused in verify.ts
export { verificationCodes };
