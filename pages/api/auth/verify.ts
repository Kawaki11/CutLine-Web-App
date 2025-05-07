// pages/api/auth/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verificationCodes } from './login';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, code } = req.body;

  const storedCode = verificationCodes.get(email);

  if (!storedCode || storedCode !== code) {
    return res.status(401).json({ error: 'Invalid or expired verification code' });
  }

  verificationCodes.delete(email); // Clean up after successful verification
  res.status(200).json({ success: true, message: 'Code verified successfully' });
}
