import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '../_lib/supabase-admin';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email: unknown;

  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('relaunch_signups')
    .insert({
      email: normalised,
      source: 'under-construction',
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
    });

  // 23505 = unique violation: already signed up. Treat as success.
  if (error && error.code !== '23505') {
    console.error('waitlist insert failed:', error.message);
    return NextResponse.json({ error: 'Could not save.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
