import { NextResponse } from 'next/server'

/**
 * Lead intake for the funnels (quiz, lead magnet, contact form).
 *
 * Everything a form collects is posted here and forwarded to Brevo as a
 * contact, so the warm-up automation can pick it up. The Brevo key never
 * reaches the browser - it lives only in the server env, and this route is the
 * only thing that touches it.
 *
 * Required env (set in .env.local, never commit real values):
 *   BREVO_API_KEY   - v3 API key from Brevo > SMTP & API
 *   BREVO_LIST_ID   - numeric id of the list the automation listens to
 *
 * Brevo stores the phone under the reserved SMS attribute and needs it in
 * international format (+371...), so we normalise before sending.
 */

type LeadBody = {
  firstName?: string
  lastName?: string
  company?: string
  email?: string
  phone?: string
  // Funnel context, all optional
  source?: string // where the visitor came from, e.g. tiktok-buvfirmas
  funnel?: string // which funnel: quiz | lead-magnet | contact
  quizResult?: string // green | yellow | red
  quizScore?: number
  industry?: string
  message?: string
}

// +371 29716434 / 29716434 / 371 29716434 -> +37129716434
function normalisePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '')
  if (!digits) return ''
  if (digits.startsWith('+')) return digits
  if (digits.startsWith('371')) return `+${digits}`
  return `+371${digits}`
}

export async function POST(request: Request) {
  let body: LeadBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }

  const email = (body.email || '').trim()
  const phone = body.phone ? normalisePhone(body.phone) : ''

  // A lead is useless without at least one way to reach them.
  if (!email && !phone) {
    return NextResponse.json({ ok: false, error: 'no_contact' }, { status: 422 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID

  if (!apiKey || !listId) {
    // Fail loudly in the server log, but do not leak config state to the client.
    console.error('[lead] Missing BREVO_API_KEY or BREVO_LIST_ID')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 })
  }

  const attributes: Record<string, string | number> = {}
  if (body.firstName) attributes.VARDS = body.firstName
  if (body.lastName) attributes.UZVARDS = body.lastName
  if (body.company) attributes.UZNEMUMS = body.company
  if (phone) attributes.SMS = phone
  if (body.industry) attributes.NOZARE = body.industry
  if (body.source) attributes.AVOTS = body.source
  if (body.funnel) attributes.PIESAISTE = body.funnel
  if (body.quizResult) attributes.KVIZS_REZULTATS = body.quizResult
  if (typeof body.quizScore === 'number') attributes.KVIZS_PUNKTI = body.quizScore
  if (body.message) attributes.ZINA = body.message

  // Brevo keys a contact by email. When only a phone is given we synthesise a
  // placeholder address so the contact is still created and the automation runs.
  const contactEmail = email || `${phone.replace('+', '')}@no-email.pbfinanses.lv`

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        email: contactEmail,
        attributes,
        listIds: [Number(listId)],
        updateEnabled: true, // returning visitor updates their record instead of erroring
      }),
    })

    if (!res.ok && res.status !== 204) {
      const detail = await res.text()
      console.error('[lead] Brevo error', res.status, detail)
      return NextResponse.json({ ok: false, error: 'provider_error' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[lead] Network error', err)
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }
}
