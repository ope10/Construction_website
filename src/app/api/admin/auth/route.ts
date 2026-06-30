import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { password } = data;
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

    if (!password || password !== adminPassword) {
      return NextResponse.json({ error: 'Access denied. Incorrect authorization code.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set secure HTTP-only cookie for authentication session (lasts 7 days)
    response.cookies.set('hq_session', adminPassword, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[API Admin Auth Error]', error);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}
