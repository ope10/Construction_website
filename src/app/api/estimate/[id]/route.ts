import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '../../../../lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('hq_session');
    if (sessionCookie?.value !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { status } = data;

    const validStatuses = ['new', 'contacted', 'quoted', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = await prisma.estimateInquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, updated }, { status: 200 });
  } catch (error) {
    console.error('[API Estimate PATCH Error]', error);
    return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 });
  }
}
