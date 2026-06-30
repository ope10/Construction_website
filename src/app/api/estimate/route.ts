import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '../../../lib/prisma';

// Serverless handler for homepage estimate form submissions
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { projectType, budget, timeline, name, email, phone, details } = data;

    // 1. Server-side input validation
    const validProjectTypes = ['residential', 'commercial', 'infrastructure'];
    const validBudgets = ['<5M', '5M-25M', '25M-100M', '100M+'];
    const validTimelines = ['under-12m', '12m-24m', '24m-36m', '36m+'];

    if (!projectType || !validProjectTypes.includes(projectType)) {
      return NextResponse.json({ error: 'Invalid project type selection.' }, { status: 400 });
    }

    if (!budget || !validBudgets.includes(budget)) {
      return NextResponse.json({ error: 'Invalid budget allocation selection.' }, { status: 400 });
    }

    if (!timeline || !validTimelines.includes(timeline)) {
      return NextResponse.json({ error: 'Invalid timeline directive selection.' }, { status: 400 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    // 2. Generate a unique transaction ID
    const transactionId = `EST-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Persist to SQLite via Prisma
    const inquiry = await prisma.estimateInquiry.create({
      data: {
        projectType,
        budget,
        timeline,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        details: details?.trim() || null,
        transactionId,
      },
    });

    console.log(`[Database] Estimate inquiry saved: ${inquiry.id} (${transactionId})`);

    // 4. Return JSON Success Response
    return NextResponse.json(
      {
        success: true,
        transactionId,
        inquiryId: inquiry.id,
        timestamp: inquiry.createdAt.toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Estimate Error]', error);
    return NextResponse.json({ error: 'Internal Server Error during estimate submission.' }, { status: 500 });
  }
}

// GET handler: retrieve all estimate inquiries (for admin use)
export async function GET() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('hq_session');

    if (sessionCookie?.value !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await prisma.estimateInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ inquiries, count: inquiries.length }, { status: 200 });
  } catch (error) {
    console.error('[API Estimate GET Error]', error);
    return NextResponse.json({ error: 'Failed to fetch estimate inquiries.' }, { status: 500 });
  }
}
