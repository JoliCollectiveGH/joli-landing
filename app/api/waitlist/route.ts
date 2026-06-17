import { NextResponse } from 'next/server';
import { createAdminClient } from '../_lib/supabase-admin';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendConfirmation(email: string) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  const from = process.env.POSTMARK_FROM_EMAIL;
  if (!token || !from) return; // confirmation email is best-effort

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; color: #1A1814;">
      <p style="font-size: 22px; letter-spacing: 0.16em; margin: 0 0 28px;">JOLI</p>
      <p style="font-size: 15px; line-height: 1.65; margin: 0 0 16px;">Thank you for joining.</p>
      <p style="font-size: 15px; line-height: 1.65; margin: 0 0 16px;">JOLI stages brand experiences inside cultural spaces, built to be felt in the room. You&rsquo;ll be among the first to receive invitations.</p>
      <p style="font-size: 15px; line-height: 1.65; margin: 28px 0 0;">&mdash; JOLI</p>
    </div>`;

  const text =
    'JOLI\n\n' +
    'Thank you for joining.\n\n' +
    'JOLI stages brand experiences inside cultural spaces, built to be felt in the room. ' +
    "You'll be among the first to receive invitations.\n\n" +
    '— JOLI';

  try {
    await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: from,
        To: email,
        Subject: "You're on the list",
        HtmlBody: html,
        TextBody: text,
        MessageStream: 'outbound',
      }),
    });
  } catch (err) {
    console.error('Postmark send failed:', err);
  }
}

export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email =
      typeof body?.email === 'string'
        ? body.email.trim().toLowerCase()
        : undefined;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('waitlist')
    .insert({ email, source: 'coming-soon' });

  if (error) {
    // 23505 = unique violation → already subscribed, treat as success
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, already: true });
    }
    console.error('Waitlist insert failed:', error.message);
    return NextResponse.json({ error: 'Could not join right now.' }, { status: 500 });
  }

  await sendConfirmation(email);

  return NextResponse.json({ ok: true });
}
