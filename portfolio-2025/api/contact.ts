import { Resend } from 'resend'

const FALLBACK_FROM = 'Portfolio Contact <onboarding@resend.dev>'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 254, message: 5000 } as const

export type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
  company?: unknown
}

export type ContactEnv = {
  apiKey?: string
  to?: string
  from?: string
}

export type ContactResult = { status: number; body: { ok: true } | { error: string } }

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function sendContactMessage(payload: ContactPayload, env: ContactEnv): Promise<ContactResult> {
  // Bots fill the hidden field. Pretend it worked so they do not retry.
  if (text(payload.company)) {
    return { status: 200, body: { ok: true } }
  }

  const name = text(payload.name).replace(/\s+/g, ' ')
  const email = text(payload.email)
  const message = text(payload.message)

  if (!name || !email || !message) {
    return { status: 400, body: { error: 'Name, email and message are required.' } }
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return { status: 400, body: { error: 'One of the fields is too long.' } }
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: 400, body: { error: 'Enter a valid email address.' } }
  }

  if (!env.apiKey || !env.to) {
    console.error('Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL')
    return { status: 500, body: { error: 'The contact form is not configured.' } }
  }

  const resend = new Resend(env.apiKey)
  const { data, error } = await resend.emails.send({
    from: env.from || FALLBACK_FROM,
    to: env.to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    html: `<p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) wrote:</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    text: `${name} (${email}) wrote:\n\n${message}`,
  })

  if (error) {
    console.error(`Resend rejected the contact message: ${error.name}: ${error.message}`)
    return { status: 502, body: { error: 'Failed to send message. Please try again later.' } }
  }

  console.log(`Contact message sent: ${data?.id}`)
  return { status: 200, body: { ok: true } }
}

export function contactEnvFrom(source: Record<string, string | undefined>): ContactEnv {
  return {
    apiKey: source.RESEND_API_KEY,
    to: source.CONTACT_TO_EMAIL,
    from: source.CONTACT_FROM_EMAIL,
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload
  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const result = await sendContactMessage(payload, contactEnvFrom(process.env))
  return Response.json(result.body, { status: result.status })
}
