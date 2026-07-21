'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

type Entry = { label: string; href: string }

export default function NavSearch() {
  const t = useTranslations('nav')
  const s = useTranslations('services')
  const locale = useLocale()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Searchable destinations: sections, About submenu, individual services
  const index = useMemo<Entry[]>(() => {
    const serviceItems = s.raw('items') as { name: string }[]
    return [
      { label: t('services'), href: `/${locale}#services` },
      { label: t('about'), href: `/${locale}#about` },
      { label: t('aboutMenu.history'), href: `/${locale}#history` },
      { label: t('aboutMenu.team'), href: `/${locale}#team` },
      { label: t('aboutMenu.office'), href: `/${locale}#office` },
      { label: t('insights'), href: `/${locale}#insights` },
      { label: t('contact'), href: `/${locale}#contact` },
      ...serviceItems.map((it) => ({ label: it.name, href: `/${locale}#services` })),
    ]
  }, [t, s, locale])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.slice(0, 6)
    return index.filter((e) => e.label.toLowerCase().includes(q)).slice(0, 8)
  }, [query, index])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const go = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <div ref={wrapRef} className="nav-search">
      <button
        type="button"
        className="nav-search-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Search"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="nav-search-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (results[0]) go(results[0].href)
            }}
          >
            <div className="nav-search-field">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
                <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Meklēt…"
                className="nav-search-input"
              />
            </div>
          </form>

          <div className="nav-search-results">
            {results.length === 0 ? (
              <div className="nav-search-empty">—</div>
            ) : (
              results.map((r, i) => (
                <Link
                  key={`${r.href}-${i}`}
                  href={r.href}
                  className="nav-search-item"
                  onClick={() => {
                    setOpen(false)
                    setQuery('')
                  }}
                >
                  {r.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .nav-search { position: relative; display: flex; }
        .nav-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid var(--color-parchment-rule);
          background: var(--color-canvas-white);
          color: var(--color-gilt);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .nav-search-btn:hover {
          background: var(--color-gilt);
          border-color: var(--color-gilt);
          color: #fff;
        }
        .nav-search-panel {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 320px;
          max-width: calc(100vw - 40px);
          background: var(--color-canvas-white);
          border: 1px solid var(--color-parchment-rule);
          border-top: 2px solid var(--color-gilt);
          box-shadow: 0 22px 48px -22px rgba(12,10,7,0.32);
          padding: 12px;
          z-index: 200;
        }
        .nav-search-field {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid var(--color-parchment-rule);
          border-radius: 10px;
          color: var(--color-stone);
        }
        .nav-search-field:focus-within {
          border-color: var(--color-gilt);
          box-shadow: 0 0 0 3px rgba(35,110,116,0.12);
        }
        .nav-search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-ink-black);
        }
        .nav-search-input::placeholder { color: var(--color-stone); }
        .nav-search-results {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
        }
        .nav-search-item {
          display: block;
          padding: 10px 12px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-graphite);
          text-decoration: none;
          transition: background 0.16s ease, color 0.16s ease;
        }
        .nav-search-item:hover {
          background: var(--color-linen-tint);
          color: var(--color-gilt);
        }
        .nav-search-empty {
          padding: 12px;
          text-align: center;
          color: var(--color-stone);
          font-family: var(--font-body);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .nav-search { display: none; }
        }
      `,
        }}
      />
    </div>
  )
}
