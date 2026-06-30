import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '../../../lib/prisma';

// Serverless handler for client inquiries and subcontractor bids
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { type, name, email, phone, company, message, projectName, bidAmount, blueprintFileName } = data;

    // 1. Server-side input validation
    if (!type || !['client', 'subcontractor'].includes(type)) {
      return NextResponse.json({ error: 'Invalid submission lane type.' }, { status: 400 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Representative name is required.' }, { status: 400 });
    }

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message requirements details are required.' }, { status: 400 });
    }

    if (type === 'subcontractor') {
      if (!projectName || !projectName.trim()) {
        return NextResponse.json({ error: 'Target Project / Tender ID is required.' }, { status: 400 });
      }
      if (!bidAmount) {
        return NextResponse.json({ error: 'Financial bid amount is required.' }, { status: 400 });
      }
      if (!blueprintFileName) {
        return NextResponse.json({ error: 'Blueprint design file attachment is required.' }, { status: 400 });
      }
    }

    // 2. Generate a unique transaction ID
    const transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Persist submission to SQLite via Prisma
    const submission = await prisma.contactSubmission.create({
      data: {
        type,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company?.trim() || null,
        message: message.trim(),
        projectName: projectName?.trim() || null,
        bidAmount: bidAmount || null,
        blueprintFileName: blueprintFileName || null,
        transactionId,
      },
    });

    console.log(`[Database] Contact submission saved: ${submission.id} (${transactionId})`);

    // 4. Return JSON Success Response
    return NextResponse.json(
      {
        success: true,
        transactionId,
        submissionId: submission.id,
        timestamp: submission.createdAt.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Contact Error]', error);
    return NextResponse.json({ error: 'Internal Server Error during data transmission.' }, { status: 500 });
  }
}

// GET handler: retrieve all contact submissions (for admin use)
export async function GET() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('hq_session');

    if (sessionCookie?.value !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ submissions, count: submissions.length }, { status: 200 });
  } catch (error) {
    console.error('[API Contact GET Error]', error);
    return NextResponse.json({ error: 'Failed to fetch submissions.' }, { status: 500 });
  }
}
