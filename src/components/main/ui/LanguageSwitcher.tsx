import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' }
] as const

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm p-1 text-sm">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => i18n.changeLanguage(code)}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            current === code
              ? 'bg-accent text-primary font-semibold'
              : 'text-white/70 hover:text-white'
          }`}
          aria-pressed={current === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
