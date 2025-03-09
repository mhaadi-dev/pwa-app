// app/api/sendEmail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import connectDb from '@/app/lib/connectDb';

// Define a Mongoose schema & model for sent emails
const EmailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

// Use existing model if already registered
const Email = mongoose.models.Email || mongoose.model('Email', EmailSchema);

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Set up Nodemailer transporter – adjust with your credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL, // e.g. your Gmail address
        pass: process.env.APP_PASS, // your Gmail password or app-specific password
      },
    });

    const mailOptions = {                                                                                  
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Connect to MongoDB and store the sent email
    await connectDb();
    const newEmail = new Email({ to, subject, message });
    await newEmail.save();

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDb();
    const emails = await Email.find().sort({ sentAt: -1 }); // Get latest emails first
    return NextResponse.json({ emails }, { status: 200 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ error: 'Failed to fetch emails' }, { status: 500 });
  }
}
