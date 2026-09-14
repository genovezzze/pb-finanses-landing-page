'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'

/**
 * "Vai tava grāmatvedība tev maksā par daudz?" - the quiz funnel.
 *
 * Seven questions, each answer carries points; the total maps to a green /
 * yellow / red verdict. The result screen is the hook: to see the personal
 * breakdown the visitor leaves a contact, which is posted to /api/lead and on
 * to Brevo, where the warm-up automation takes over.
 *
 * Client-facing copy is Latvian by design - this page is the landing for
 * Latvian-language video traffic, so it is not wired through next-intl.
 */

type Option = { label: string; points: number; industry?: string }
type Question = { id: string; title: string; options: Option[] }

const QUESTIONS: Question[] = [
  {
    id: 'reports',
    title: 'Cik bieži tu saņem finanšu pārskatus (naudas plūsma, peļņa, izdevumi)?',
    options: [
      { label: 'Katru mēnesi, skaidri un laikā', points: 0 },
      { label: 'Reizi ceturksnī', points: 1 },
      { label: 'Tikai gada beigās vai pēc pieprasījuma', points: 2 },
      { label: 'Praktiski nekad', points: 3 },
    ],
  },
  {
    id: 'clarity',
    title: 'Vai tu saproti savu ikmēneša finanšu rezultātu bez papildu skaidrojumiem?',
    options: [
      { label: 'Jā, viss ir skaidrs', points: 0 },
      { label: 'Daļēji - dažas lietas paliek neskaidras', points: 1 },
      { label: 'Reti saprotu, kas tur īsti notiek', points: 2 },
    ],
  },
  {
    id: 'advice',
    title: 'Vai grāmatvedis pats iesaka, kā legāli ietaupīt nodokļus vai uzlabot finanses?',
    options: [
      { label: 'Jā, regulāri nāk ar ieteikumiem', points: 0 },
      { label: 'Tikai tad, ja es pats pajautāju', points: 1 },
      { label: 'Nekad - tikai kārto uzskaiti', points: 2 },
    ],
  },
  {
    id: 'penalties',
    title: 'Vai pēdējos 2 gados ir bijušas soda naudas vai kavēti nodokļu maksājumi?',
    options: [
      { label: 'Nē, nekad', points: 0 },
      { label: 'Vienu vai divas reizes', points: 2 },
      { label: 'Jā, vairākkārt', points: 3 },
    ],
  },
  {
    id: 'availability',
    title: 'Cik ātri tu vari sazināties ar savu grāmatvedi, kad ir svarīgs jautājums?',
    options: [
      { label: 'Tajā pašā dienā', points: 0 },
      { label: 'Dažu dienu laikā', points: 1 },
      { label: 'Grūti sazināties, jāgaida ilgi', points: 2 },
    ],
  },
  {
    id: 'growth',
    title: 'Vai tava grāmatvedība ir gatava uzņēmuma izaugsmei (jauni darījumi, projekti, darbinieki)?',
    options: [
      { label: 'Jā, esmu drošs par to', points: 0 },
      { label: 'Neesmu pārliecināts', points: 1 },
      { label: 'Nē, jūtu, ka tā ir "šaurā vieta"', points: 2 },
    ],
  },
  {
    id: 'industry',
    title: 'Kurā nozarē tu strādā?',
    options: [
      { label: 'Būvniecība', points: 0, industry: 'Būvniecība' },
      { label: 'IT / tehnoloģijas', points: 0, industry: 'IT' },
      { label: 'Tirdzniecība', points: 0, industry: 'Tirdzniecība' },
      { label: 'Pakalpojumi', points: 0, industry: 'Pakalpojumi' },
      { label: 'Cita nozare', points: 0, industry: 'Cita' },
    ],
  },
]

const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0,
)

type Verdict = {
  key: 'green' | 'yellow' | 'red'
  emoji: string
  title: string
  text: string
}

function verdictFor(score: number): Verdict {
  const ratio = score / MAX_SCORE
  if (ratio <= 0.25) {
    return {
      key: 'green',
      emoji: '🟢',
      title: 'Zaļā zona - tava grāmatvedība strādā tavā labā',
      text: 'Pēc atbildēm izskatās, ka pamati ir kārtībā. Tomēr pat labā sistēmā mēdz slēpties vietas, kur uzņēmums maksā vairāk nekā vajadzētu. Atstāj kontaktu - atsūtīsim personīgu pārbaudi un bezmaksas konsultāciju, lai pārliecinātos.',
    }
  }
  if (ratio <= 0.55) {
    return {
      key: 'yellow',
      emoji: '🟡',
      title: 'Dzeltenā zona - ir kur uzlabot',
      text: 'Vairākas atbildes norāda uz vietām, kur tava grāmatvedība, visticamāk, tev izmaksā dārgāk vai rada risku. Atstāj kontaktu - atsūtīsim personīgu analīzi, kur tieši ir potenciāls ietaupīt.',
    }
  }
  return {
    key: 'red',
    emoji: '🔴',
    title: 'Sarkanā zona - tava grāmatvedība, visticamāk, maksā par daudz',
    text: 'Atbildes liecina, ka uzņēmums, iespējams, pārmaksā vai uzņemas nevajadzīgu risku. Tas ir labojams. Atstāj kontaktu - sagatavosim personīgu izvērtējumu un piedāvāsim bezmaksas konsultāciju, lai to sakārtotu.',
  }
}

export default function Quiz() {
  const [step, setStep] = useState(0) // 0..QUESTIONS.length-1 = questions, then form
  const [answers, setAnswers] = useState<(Option | null)[]>(
    () => QUESTIONS.map(() => null),
  )
  const [source, setSource] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  // Capture where the visitor came from (?src=tiktok-buvfirmas) so we know which
  // video actually drives contacts. Read from the URL rather than useSearchParams
  // to avoid a Suspense boundary requirement at build time.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSource(params.get('src') || params.get('utm_source') || '')
  }, [])

  const answered = step < QUESTIONS.length
  const score = useMemo(
    () => answers.reduce((sum, a) => sum + (a?.points ?? 0), 0),
    [answers],
  )
  const industry = useMemo(
    () => answers.find((a) => a?.industry)?.industry ?? '',
    [answers],
  )
  const verdict = useMemo(() => verdictFor(score), [score])
  const progress = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100)

  const pick = (option: Option) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = option
      return next
    })
    // Small delay so the selection is visible before advancing.
    setTimeout(() => setStep((s) => s + 1), 180)
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: String(data.get('firstName') || ''),
          lastName: String(data.get('lastName') || ''),
          company: String(data.get('company') || ''),
          email: String(data.get('email') || ''),
          phone: String(data.get('phone') || ''),
          funnel: 'quiz',
          source,
          industry,
          quizResult: verdict.key,
          quizScore: score,
        }),
      })
      const json = await res.json().catch(() => ({ ok: false }))
      if (!res.ok || !json.ok) throw new Error(json.error || 'failed')
      setDone(true)
    } catch {
      setError('Neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai zvani +371 29 716 434.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="quiz">
      <div className="quiz-shell">
        {/* Progress */}
        {!done && (
          <div className="quiz-progress" aria-hidden="true">
            <span style={{ width: `${answered ? progress : 100}%` }} />
          </div>
        )}

        {/* ── Questions ── */}
        {answered && (
          <div className="quiz-step" key={step}>
            <p className="quiz-count">
              {step + 1} / {QUESTIONS.length}
            </p>
            <h2 className="quiz-q">{QUESTIONS[step].title}</h2>
            <div className="quiz-options">
              {QUESTIONS[step].options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className={`quiz-option${answers[step]?.label === option.label ? ' is-picked' : ''}`}
                  onClick={() => pick(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button type="button" className="quiz-back" onClick={back}>
                ← Atpakaļ
              </button>
            )}
          </div>
        )}

        {/* ── Result + contact capture ── */}
        {!answered && !done && (
          <div className="quiz-result">
            <div className={`quiz-badge quiz-badge--${verdict.key}`}>
              <span className="quiz-emoji">{verdict.emoji}</span>
              {verdict.title}
            </div>
            <p className="quiz-result-text">{verdict.text}</p>

            <form className="quiz-form" onSubmit={handleSubmit}>
              <div className="quiz-row">
                <input name="firstName" required placeholder="Vārds" className="quiz-input" />
                <input name="lastName" required placeholder="Uzvārds" className="quiz-input" />
              </div>
              <input name="company" required placeholder="Uzņēmuma nosaukums" className="quiz-input" />
              <input name="email" type="email" required placeholder="E-pasts" className="quiz-input" />
              <input name="phone" type="tel" required placeholder="Tālrunis" className="quiz-input" />

              <button type="submit" className="quiz-submit" disabled={submitting}>
                {submitting ? 'Sūta...' : 'Saņemt personīgo analīzi'}
              </button>
              {error && <p className="quiz-error">{error}</p>}
              <p className="quiz-note">
                Konsultācija 100 € - bezmaksas, ja kļūsti par klientu. Tavi dati netiek nodoti trešajām pusēm.
              </p>
            </form>
          </div>
        )}

        {/* ── Thank you ── */}
        {done && (
          <div className="quiz-thanks">
            <span className="quiz-emoji quiz-emoji--big">✓</span>
            <h2 className="quiz-q">Paldies! Saņēmām tavas atbildes.</h2>
            <p className="quiz-result-text">
              Sagatavosim personīgu izvērtējumu un sazināsimies tuvākajā laikā. Ja vēlies ātrāk - zvani{' '}
              <a href="tel:+37129716434">+371 29 716 434</a>.
            </p>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .quiz {
          background: var(--color-linen-tint);
          padding: clamp(24px, 4vw, 44px) 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .quiz-shell {
          width: 100%;
          max-width: 640px;
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 20px;
          box-shadow: 0 40px 80px -40px rgba(12,10,7,0.32);
          padding: clamp(22px, 3vw, 34px);
        }
        .quiz-progress {
          height: 5px;
          border-radius: 999px;
          background: var(--color-parchment-wash);
          overflow: hidden;
          margin-bottom: 22px;
        }
        .quiz-progress span {
          display: block;
          height: 100%;
          border-radius: 999px;
          background: var(--color-gilt);
          transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .quiz-count {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.12em;
          color: var(--color-gilt);
          margin-bottom: 12px;
        }
        .quiz-q {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--color-ink-black);
          margin-bottom: 26px;
        }
        .quiz-options { display: flex; flex-direction: column; gap: 12px; }
        .quiz-option {
          text-align: left;
          font-family: var(--font-body);
          font-size: 16px;
          color: var(--color-ink-black);
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 14px;
          padding: 18px 20px;
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease, transform .2s cubic-bezier(.16,1,.3,1);
        }
        .quiz-option:hover {
          border-color: var(--color-gilt);
          background: var(--color-linen-tint);
          transform: translateY(-2px);
        }
        .quiz-option.is-picked {
          border-color: var(--color-gilt);
          background: var(--color-gilt);
          color: #fff;
        }
        .quiz-back {
          margin-top: 22px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-stone);
          transition: color .2s ease;
        }
        .quiz-back:hover { color: var(--color-gilt); }

        .quiz-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(17px, 2vw, 21px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          padding: 12px 18px;
          border-radius: 14px;
          margin-bottom: 14px;
        }
        .quiz-emoji { font-size: 22px; line-height: 1; }
        .quiz-emoji--big {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px; height: 56px;
          border-radius: 999px;
          background: var(--color-gilt);
          color: #fff;
          font-size: 30px;
          margin-bottom: 20px;
        }
        .quiz-badge--green { background: rgba(35,110,116,0.10); color: var(--color-gilt-dark); }
        .quiz-badge--yellow { background: rgba(198,155,58,0.14); color: #8a6a1f; }
        .quiz-badge--red { background: rgba(178,58,58,0.10); color: #a13636; }
        .quiz-result-text {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.55;
          color: var(--color-graphite);
          margin-bottom: 18px;
        }

        .quiz-form { display: flex; flex-direction: column; gap: 9px; }
        .quiz-row { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
        .quiz-input {
          width: 100%;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-ink-black);
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-radius: 10px;
          padding: 10px 13px;
          outline: none;
          transition: border-color .2s ease;
        }
        .quiz-input::placeholder { color: var(--color-stone); }
        .quiz-input:focus { border-color: var(--color-gilt); }
        .quiz-submit {
          margin-top: 3px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background: var(--color-gilt);
          border: none;
          border-radius: 10px;
          padding: 12px 20px;
          cursor: pointer;
          transition: background .2s ease, transform .2s cubic-bezier(.16,1,.3,1);
        }
        .quiz-submit:hover:not(:disabled) { background: var(--color-gilt-dark); transform: translateY(-2px); }
        .quiz-submit:disabled { opacity: 0.6; cursor: default; }
        .quiz-error { font-family: var(--font-body); font-size: 13px; color: #a13636; }
        .quiz-note { font-family: var(--font-body); font-size: 11.5px; line-height: 1.45; color: var(--color-stone); }

        .quiz-thanks { text-align: center; }
        .quiz-thanks a { color: var(--color-gilt); }

        @media (max-width: 520px) {
          .quiz-row { grid-template-columns: 1fr; }
        }
      `,
        }}
      />
    </section>
  )
}
