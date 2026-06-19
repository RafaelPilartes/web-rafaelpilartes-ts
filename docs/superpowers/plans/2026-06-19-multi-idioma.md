# Multi-idioma (i18n) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add PT (default) + EN language switching across all fixed UI in `src/components/main`, `src/pages/main`, and `src/Layout`.

**Architecture:** Use `i18next` + `react-i18next` + `i18next-browser-languagedetector`. A single `src/lib/i18n.ts` initializes i18next with statically-imported JSON namespaces under `src/locales/{pt,en}`. A `LanguageSwitcher` in the Header calls `i18n.changeLanguage()`; the detector persists the choice in `localStorage`. Components consume strings via `useTranslation('<namespace>')`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, i18next/react-i18next.

## Global Constraints

- Default and fallback language: `pt`. Supported: `['pt', 'en']`.
- Persistence key: `i18nextLng` in `localStorage`. Detection order: `['localStorage', 'navigator']`.
- PT JSON is the source of truth; every key added to a PT namespace MUST also exist in the matching EN namespace.
- Scope is fixed UI only. Do NOT touch Supabase data, `src/components/admin/**`, `src/pages/admin/**`, or routing/URLs.
- No automated test suite exists. The verification cycle for every task is `npm run build` (must pass) plus the manual checks stated in the task.
- Namespace files: `common`, `nav`, `home`, `about`, `services`, `work`, `blog`, `contact`, `footer`.
- Translation key naming: lowercase dot/camel keys grouped by component/section, e.g. `home.hero.title`, `nav.about`, `common.contactCta`.

---

## File Structure

**Created:**
- `src/lib/i18n.ts` — i18next initialization and resource registration.
- `src/locales/pt/<namespace>.json` and `src/locales/en/<namespace>.json` — 9 namespaces × 2 langs = 18 files.
- `src/components/main/ui/LanguageSwitcher.tsx` — PT/EN toggle.

**Modified:**
- `src/main.tsx` — import `./lib/i18n` before render.
- `src/components/main/Header.tsx` — mount `LanguageSwitcher`.
- All fixed-string files under `src/components/main/**`, `src/pages/main/**`, `src/Layout/**`.

---

### Task 1: i18n infrastructure + empty namespaces

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/locales/pt/common.json`, `src/locales/en/common.json` (and the other 7 namespaces as empty `{}` objects for pt and en)
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: a configured global i18next instance (side-effect import). Components later call `useTranslation('<ns>')` from `react-i18next`. Namespaces available: `common`, `nav`, `home`, `about`, `services`, `work`, `blog`, `contact`, `footer`.

- [ ] **Step 1: Install dependencies**

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

- [ ] **Step 2: Create empty namespace JSON files**

Create each of these as `{}` for both `pt` and `en`:
`common.json`, `nav.json`, `home.json`, `about.json`, `services.json`, `work.json`, `blog.json`, `contact.json`, `footer.json`.

```bash
mkdir -p src/locales/pt src/locales/en
for ns in common nav home about services work blog contact footer; do
  printf '{}\n' > "src/locales/pt/$ns.json"
  printf '{}\n' > "src/locales/en/$ns.json"
done
```

- [ ] **Step 3: Create `src/lib/i18n.ts`**

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptCommon from '../locales/pt/common.json'
import ptNav from '../locales/pt/nav.json'
import ptHome from '../locales/pt/home.json'
import ptAbout from '../locales/pt/about.json'
import ptServices from '../locales/pt/services.json'
import ptWork from '../locales/pt/work.json'
import ptBlog from '../locales/pt/blog.json'
import ptContact from '../locales/pt/contact.json'
import ptFooter from '../locales/pt/footer.json'

import enCommon from '../locales/en/common.json'
import enNav from '../locales/en/nav.json'
import enHome from '../locales/en/home.json'
import enAbout from '../locales/en/about.json'
import enServices from '../locales/en/services.json'
import enWork from '../locales/en/work.json'
import enBlog from '../locales/en/blog.json'
import enContact from '../locales/en/contact.json'
import enFooter from '../locales/en/footer.json'

export const NAMESPACES = [
  'common',
  'nav',
  'home',
  'about',
  'services',
  'work',
  'blog',
  'contact',
  'footer'
] as const

const resources = {
  pt: {
    common: ptCommon,
    nav: ptNav,
    home: ptHome,
    about: ptAbout,
    services: ptServices,
    work: ptWork,
    blog: ptBlog,
    contact: ptContact,
    footer: ptFooter
  },
  en: {
    common: enCommon,
    nav: enNav,
    home: enHome,
    about: enAbout,
    services: enServices,
    work: enWork,
    blog: enBlog,
    contact: enContact,
    footer: enFooter
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    ns: NAMESPACES as unknown as string[],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: { escapeValue: false }
  })

export default i18n
```

- [ ] **Step 4: Enable JSON module resolution if needed and wire main.tsx**

`tsconfig.json` for Vite + React already allows JSON imports via `resolveJsonModule` (Vite enables it). Confirm `resolveJsonModule` is true in `tsconfig.json`; if absent, add `"resolveJsonModule": true` under `compilerOptions`.

Edit `src/main.tsx` to import the i18n init before render:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './lib/i18n'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS (tsc + vite build complete with no errors).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/lib/i18n.ts src/locales tsconfig.json src/main.tsx
git commit -m "feat(i18n): add i18next infrastructure and empty namespaces"
```

---

### Task 2: LanguageSwitcher + Header wiring (pilot pattern)

**Files:**
- Create: `src/components/main/ui/LanguageSwitcher.tsx`
- Modify: `src/components/main/Header.tsx`

**Interfaces:**
- Consumes: global i18n instance from Task 1.
- Produces: `LanguageSwitcher` default export — a self-contained PT/EN toggle button; no props.

- [ ] **Step 1: Create the LanguageSwitcher**

```tsx
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
```

- [ ] **Step 2: Mount it in Header**

Edit `src/components/main/Header.tsx`, replacing the empty `<nav>` with the switcher:

```tsx
import { Link } from 'react-router-dom'
import LanguageSwitcher from './ui/LanguageSwitcher'

export const Header = () => {
  return (
    <header className="absolute top-0 z-10 h-24 w-full flex items-center justify-center">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img
            width={204}
            height={177}
            src="/images/Rafael_white.svg"
            alt="Rafael Pilartes Dev"
          />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10">
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Manual check**

Run `npm run dev`, load the site. Confirm the PT/EN toggle renders in the header, PT is active by default, clicking EN keeps the active state, and reloading keeps the selection (check `localStorage` key `i18nextLng`).

- [ ] **Step 5: Commit**

```bash
git add src/components/main/ui/LanguageSwitcher.tsx src/components/main/Header.tsx
git commit -m "feat(i18n): add language switcher in header"
```

---

### Task 3: Migrate navigation (pilot)

**Files:**
- Modify: `src/components/main/Nav.tsx`
- Modify: `src/locales/pt/nav.json`, `src/locales/en/nav.json`

**Interfaces:**
- Consumes: `useTranslation` from `react-i18next`, `nav` namespace.

- [ ] **Step 1: Fill nav namespace JSON**

`src/locales/pt/nav.json`:

```json
{
  "home": "Início",
  "about": "Sobre",
  "services": "Serviços",
  "works": "Trabalhos",
  "blog": "Blog",
  "contacts": "Contactos"
}
```

`src/locales/en/nav.json`:

```json
{
  "home": "Home",
  "about": "About",
  "services": "Services",
  "works": "Work",
  "blog": "Blog",
  "contacts": "Contact"
}
```

- [ ] **Step 2: Use t() in Nav.tsx**

Move `navData` to use translation keys. Build the array inside the component so `t` is in scope:

```tsx
import {
  HiHome,
  HiUser,
  HiRectangleGroup,
  HiViewColumns,
  HiDocumentText,
  HiEnvelope
} from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { routsNameMain } from '../../data/routsName'

interface navDataInterface {
  name: string
  path: string
  icon: JSX.Element
}

const Nav = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation('nav')

  const navData: navDataInterface[] = [
    { name: t('home'), path: routsNameMain.home, icon: <HiHome /> },
    { name: t('about'), path: routsNameMain.about, icon: <HiUser /> },
    { name: t('services'), path: routsNameMain.services, icon: <HiRectangleGroup /> },
    { name: t('works'), path: routsNameMain.works, icon: <HiViewColumns /> },
    { name: t('blog'), path: routsNameMain.blog, icon: <HiDocumentText /> },
    { name: t('contacts'), path: routsNameMain.contacts, icon: <HiEnvelope /> }
  ]

  return (
    // ... existing JSX unchanged, still maps over navData ...
  )
}

export default Nav
```

Keep the existing `<nav>...</nav>` JSX exactly as it is — only the `navData` definition moves inside the component and uses `t()`.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Manual check**

In dev, toggle PT/EN; confirm the nav tooltips switch between "Início/Sobre/…" and "Home/About/…".

- [ ] **Step 5: Commit**

```bash
git add src/components/main/Nav.tsx src/locales/pt/nav.json src/locales/en/nav.json
git commit -m "feat(i18n): translate main navigation"
```

---

### Task 4: Migrate home — hero + about section (pilot)

**Files:**
- Modify: `src/components/main/page/home/HomeContentText.tsx`
- Modify: `src/components/main/page/home/HomeAboutSection.tsx`
- Modify: `src/locales/pt/home.json`, `src/locales/en/home.json`

**Interfaces:**
- Consumes: `useTranslation('home')`. The hero rotating words use `t('hero.rotating', { returnObjects: true })` returning a string array.

- [ ] **Step 1: Fill home namespace JSON (hero + about)**

`src/locales/pt/home.json`:

```json
{
  "hero": {
    "titleLine1": "Soluções para fazer",
    "titleLine2": "crescer",
    "rotating": ["seu Negócio!", "sua Startup", "sua Imagem"],
    "subtitle": "Acredito no poder das ideias e na capacidade da tecnologia de torná-las realidade. Com habilidade e criatividade, desenvolvo soluções digitais sob medida, alinhadas às necessidades e objetivos de cada cliente.",
    "contactCta": "Entre em contato",
    "downloadCv": "Baixar Currículo"
  },
  "about": {
    "badge": "Full-Stack Developer",
    "headingLine1": "Crafting Digital",
    "headingLine2": "Experiences That",
    "headingAccent": "Matter",
    "paragraph1": "Sou um desenvolvedor React apaixonado com mais de 3 anos de experiência na construção de aplicações web escaláveis e performáticas. Especializo-me em criar interfaces intuitivas que combinam design bonito com funcionalidade excepcional.",
    "paragraph2": "Quando não estou a programar, encontras-me a contribuir para projectos open-source, a escrever artigos técnicos ou a explorar novas tendências de design.",
    "highlights": {
      "expertiseTitle": "Expertise",
      "expertiseDesc": "Especializado em construir aplicações web escaláveis com tecnologias modernas e melhores práticas.",
      "cleanCodeTitle": "Clean Code",
      "cleanCodeDesc": "Escrevendo código mantível e bem-documentado que escala.",
      "performanceTitle": "Performance",
      "performanceDesc": "Optimizando velocidade e eficiência em cada projeto."
    },
    "stats": {
      "happyClients": "Clientes Satisfeitos",
      "codeCommits": "Commits de Código",
      "githubStars": "GitHub Stars",
      "clientSatisfaction": "Satisfação do Cliente",
      "supportAvailable": "Suporte Disponível",
      "deliveryTime": "Tempo de Entrega",
      "fast": "Rápido"
    }
  }
}
```

`src/locales/en/home.json`:

```json
{
  "hero": {
    "titleLine1": "Solutions to grow",
    "titleLine2": "your",
    "rotating": ["Business!", "Startup", "Brand"],
    "subtitle": "I believe in the power of ideas and technology's ability to make them real. With skill and creativity, I build tailor-made digital solutions aligned with each client's needs and goals.",
    "contactCta": "Get in touch",
    "downloadCv": "Download CV"
  },
  "about": {
    "badge": "Full-Stack Developer",
    "headingLine1": "Crafting Digital",
    "headingLine2": "Experiences That",
    "headingAccent": "Matter",
    "paragraph1": "I'm a passionate React developer with 3+ years of experience building scalable, high-performance web applications. I specialize in crafting intuitive interfaces that combine beautiful design with exceptional functionality.",
    "paragraph2": "When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or exploring new design trends.",
    "highlights": {
      "expertiseTitle": "Expertise",
      "expertiseDesc": "Specialized in building scalable web applications with modern technologies and best practices.",
      "cleanCodeTitle": "Clean Code",
      "cleanCodeDesc": "Writing maintainable, well-documented code that scales.",
      "performanceTitle": "Performance",
      "performanceDesc": "Optimizing speed and efficiency in every project."
    },
    "stats": {
      "happyClients": "Happy Clients",
      "codeCommits": "Code Commits",
      "githubStars": "GitHub Stars",
      "clientSatisfaction": "Client Satisfaction",
      "supportAvailable": "Support Available",
      "deliveryTime": "Delivery Time",
      "fast": "Fast"
    }
  }
}
```

Note: the PT hero title splits as "Soluções para fazer / crescer <rotating>". The EN equivalent reads "Solutions to grow / your <rotating>". Keep `titleLine2` + rotating word grammatical in each language.

- [ ] **Step 2: Migrate HomeContentText.tsx**

Add `import { useTranslation } from 'react-i18next'`. Inside the component, `const { t } = useTranslation('home')`. Replace:
- Title text → `t('hero.titleLine1')`, `t('hero.titleLine2')`.
- `TypeAnimation` sequence → build from the array: `const rotating = t('hero.rotating', { returnObjects: true }) as string[]` then construct `sequence={rotating.flatMap(w => [w, 1000])}`.
- Subtitle `<p>` → `t('hero.subtitle')`.
- Contact button text "Entre em contato" → `t('hero.contactCta')`.
- "Baixar Currículo" → `t('hero.downloadCv')`.

Leave `homeInfo.technologies` (brand names) and `socials` URLs unchanged — they are not translatable copy.

- [ ] **Step 3: Migrate HomeAboutSection.tsx**

Add `useTranslation('home')`. Move the module-level `highlights`, `stats`, `rightStats` arrays inside the component, replacing literals with `t('about.highlights.*')` and `t('about.stats.*')`. The numeric `value` fields (`'45+'`, `'2.5K+'`, etc.) stay as literals; only the `label`/`title`/`description` text uses `t()`. Replace the badge "Full-Stack Developer", heading lines, and the two `<p>` paragraphs with their `t('about.*')` keys.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Manual check**

In dev, toggle PT/EN on the home page. Confirm hero title, rotating words, subtitle, both buttons, the about badge, headings, paragraphs, highlight cards, and stat labels all switch.

- [ ] **Step 6: Commit**

```bash
git add src/components/main/page/home/HomeContentText.tsx src/components/main/page/home/HomeAboutSection.tsx src/locales/pt/home.json src/locales/en/home.json
git commit -m "feat(i18n): translate home hero and about section"
```

---

### Task 5: Migrate remaining home sections

**Files:**
- Modify: `src/components/main/page/home/HomeQuality.tsx`, `HomeKnownTechs.tsx`, `HomeServices.tsx`, `HomeProjects.tsx`, `HomeCustomers.tsx`, `HomeTestimonials.tsx`, `HomeContentAvatar.tsx` (any with fixed copy)
- Modify: `src/locales/pt/home.json`, `src/locales/en/home.json`

**Interfaces:**
- Consumes: `useTranslation('home')`. Adds keys under top-level groups `quality`, `knownTechs`, `services`, `projects`, `customers`, `testimonials`.

- [ ] **Step 1: Extract strings per file**

For each listed file: read it, identify every hardcoded PT (or EN) display string — section titles, subtitles, "ver mais" links, empty/loading labels. For each string add a key under the matching group in BOTH `pt/home.json` and `en/home.json`, e.g.:

```json
"services": { "title": "...", "subtitle": "..." }
```

Skip strings sourced from Supabase (mapped data like service titles from the API); only translate the static section chrome.

- [ ] **Step 2: Apply t() in each component**

In each file add `const { t } = useTranslation('home')` and replace the identified literals with `t('<group>.<key>')`. Where strings live in module-level arrays, move the array inside the component.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Manual check**

Toggle PT/EN on home; confirm every remaining section's fixed copy switches and no Supabase-driven content is broken.

- [ ] **Step 5: Commit**

```bash
git add src/components/main/page/home src/locales/pt/home.json src/locales/en/home.json
git commit -m "feat(i18n): translate remaining home sections"
```

---

### Task 6: Migrate About page

**Files:**
- Modify: `src/pages/main/about/**`, `src/components/main/AboutExperienceItem.tsx`, `src/components/main/AboutCertificateItem.tsx` (fixed copy only)
- Modify: `src/locales/pt/about.json`, `src/locales/en/about.json`

**Interfaces:**
- Consumes: `useTranslation('about')`.

- [ ] **Step 1: Extract + fill about.json**

Read the About page and its item components. For every fixed display string (page title, section headings like "Experiência"/"Certificados", labels, empty states), add a key to both `pt/about.json` and `en/about.json`. Group by section, e.g. `{ "title": "...", "experience": { "heading": "..." } }`. Leave Supabase-driven experience/certificate records untranslated.

- [ ] **Step 2: Apply t()**

Add `useTranslation('about')` to each file and replace literals with `t('<key>')`.

- [ ] **Step 3: Verify build** — Run `npm run build`; Expected: PASS.

- [ ] **Step 4: Manual check** — Toggle PT/EN on `/about`; confirm fixed copy switches.

- [ ] **Step 5: Commit**

```bash
git add src/pages/main/about src/components/main/AboutExperienceItem.tsx src/components/main/AboutCertificateItem.tsx src/locales/pt/about.json src/locales/en/about.json
git commit -m "feat(i18n): translate about page"
```

---

### Task 7: Migrate Services page

**Files:**
- Modify: `src/pages/main/services/**`, `src/components/main/ServicesSection.tsx`, `src/components/main/ServiceSlider.tsx` (fixed copy only)
- Modify: `src/locales/pt/services.json`, `src/locales/en/services.json`

**Interfaces:**
- Consumes: `useTranslation('services')`.

- [ ] **Step 1: Extract + fill services.json** — read the files; add every fixed display string (page/section titles, intros, CTA labels) to both `pt/services.json` and `en/services.json`. Skip Supabase service records.
- [ ] **Step 2: Apply t()** — add `useTranslation('services')`; replace literals with `t('<key>')`.
- [ ] **Step 3: Verify build** — `npm run build`; Expected: PASS.
- [ ] **Step 4: Manual check** — Toggle PT/EN on `/services`.
- [ ] **Step 5: Commit**

```bash
git add src/pages/main/services src/components/main/ServicesSection.tsx src/components/main/ServiceSlider.tsx src/locales/pt/services.json src/locales/en/services.json
git commit -m "feat(i18n): translate services page"
```

---

### Task 8: Migrate Work page

**Files:**
- Modify: `src/pages/main/work/**`, `src/components/main/WorkSlider.tsx`, `src/components/main/WorkCarousel.tsx`, `src/components/main/WorkContentText.tsx`, `src/components/main/WorkDetailsHeroContainer.tsx`, `src/components/main/ProjectCard.tsx`, `src/components/main/ProjectsBtn.tsx`, `src/components/main/PageIntroduction.tsx` (fixed copy only)
- Modify: `src/locales/pt/work.json`, `src/locales/en/work.json`

**Interfaces:**
- Consumes: `useTranslation('work')`.

- [ ] **Step 1: Extract + fill work.json** — add every fixed display string (page title/intro, "Ver projeto"/"Ver mais"/"Voltar", section labels) to both `pt/work.json` and `en/work.json`. Skip Supabase project records (titles, descriptions, tech names).
- [ ] **Step 2: Apply t()** — add `useTranslation('work')`; replace literals. If `PageIntroduction` is reused by multiple pages with different copy, pass the translated text in as props from each page rather than hardcoding a namespace inside it.
- [ ] **Step 3: Verify build** — `npm run build`; Expected: PASS.
- [ ] **Step 4: Manual check** — Toggle PT/EN on `/works` and a work details page.
- [ ] **Step 5: Commit**

```bash
git add src/pages/main/work src/components/main/WorkSlider.tsx src/components/main/WorkCarousel.tsx src/components/main/WorkContentText.tsx src/components/main/WorkDetailsHeroContainer.tsx src/components/main/ProjectCard.tsx src/components/main/ProjectsBtn.tsx src/components/main/PageIntroduction.tsx src/locales/pt/work.json src/locales/en/work.json
git commit -m "feat(i18n): translate work page"
```

---

### Task 9: Migrate Blog page

**Files:**
- Modify: `src/pages/main/blog/**` (including `blog/details`)
- Modify: `src/locales/pt/blog.json`, `src/locales/en/blog.json`

**Interfaces:**
- Consumes: `useTranslation('blog')`.

- [ ] **Step 1: Extract + fill blog.json** — add every fixed display string (page title, "Ler mais", "Categorias", search/empty/loading labels, "Voltar ao blog", reading-time/date labels) to both `pt/blog.json` and `en/blog.json`. Post titles, excerpts, content, category names come from Supabase — leave untranslated.
- [ ] **Step 2: Apply t()** — add `useTranslation('blog')`; replace literals.
- [ ] **Step 3: Verify build** — `npm run build`; Expected: PASS.
- [ ] **Step 4: Manual check** — Toggle PT/EN on `/blog` and a post detail page.
- [ ] **Step 5: Commit**

```bash
git add src/pages/main/blog src/locales/pt/blog.json src/locales/en/blog.json
git commit -m "feat(i18n): translate blog page chrome"
```

---

### Task 10: Migrate Contact page

**Files:**
- Modify: `src/pages/main/contact/**`
- Modify: `src/locales/pt/contact.json`, `src/locales/en/contact.json`

**Interfaces:**
- Consumes: `useTranslation('contact')`.

- [ ] **Step 1: Extract + fill contact.json** — add every fixed display string: page title/intro, form field labels and placeholders, submit button, success/error toast messages, and any validation messages. Add to both `pt/contact.json` and `en/contact.json`.
- [ ] **Step 2: Apply t()** — add `useTranslation('contact')`; replace literals. For Zod validation messages, reference `t()` where the schema is built inside the component, or map error keys to `t()` at render.
- [ ] **Step 3: Verify build** — `npm run build`; Expected: PASS.
- [ ] **Step 4: Manual check** — Toggle PT/EN on `/contacts`; submit empty form to confirm validation/toast copy switches.
- [ ] **Step 5: Commit**

```bash
git add src/pages/main/contact src/locales/pt/contact.json src/locales/en/contact.json
git commit -m "feat(i18n): translate contact page"
```

---

### Task 11: Migrate Footer + shared/common strings

**Files:**
- Modify: `src/components/main/Footer.tsx`, `src/components/main/BackToTop.tsx`, `src/components/main/Buttons.tsx`, `src/components/main/SectionTitle.tsx`, and any remaining `src/components/main/**` / `src/Layout/**` files with fixed copy
- Modify: `src/locales/pt/footer.json`, `src/locales/en/footer.json`, `src/locales/pt/common.json`, `src/locales/en/common.json`

**Interfaces:**
- Consumes: `useTranslation('footer')` and `useTranslation('common')`.

- [ ] **Step 1: Extract + fill footer.json and common.json** — Footer copy (tagline, nav labels if any, copyright, "feito com") → `footer.json`. Cross-cutting reusable strings (generic buttons like "Ver mais", "Voltar", "Carregando…", "Nenhum resultado") → `common.json`. Add to both langs.
- [ ] **Step 2: Apply t()** — add the appropriate `useTranslation(ns)` to each remaining file and replace literals.
- [ ] **Step 3: Sweep for leftovers**

Run a search to catch any untranslated Portuguese left in main/Layout:

```bash
grep -rnoE '>[^<>{}]*[áàâãéêíóôõúç][^<>{}]*<' src/components/main src/pages/main src/Layout || echo "no obvious leftover PT text in JSX"
```

Review hits; migrate any genuine display strings missed by earlier tasks (add keys to the most fitting namespace).

- [ ] **Step 4: Verify build** — `npm run build`; Expected: PASS.
- [ ] **Step 5: Full manual sweep** — Toggle PT/EN and walk every page (home, about, services, works + details, blog + post, contacts). Confirm no fixed string stays in the wrong language and the footer switches.
- [ ] **Step 6: Commit**

```bash
git add src/components/main src/pages/main src/Layout src/locales
git commit -m "feat(i18n): translate footer and shared strings; complete main/Layout migration"
```

---

## Self-Review Notes

- **Spec coverage:** infrastructure (Task 1), switcher + persistence (Task 2), nav (Task 3), full home (Tasks 4–5), about/services/work/blog/contact (Tasks 6–10), footer + common + leftover sweep (Task 11). All 9 namespaces filled. Supabase/admin/routing excluded per spec.
- **Default language pt / fallback pt / localStorage key `i18nextLng`:** set in Task 1 and asserted as Global Constraints.
- **PT⇄EN key parity:** every fill step states keys go into both `pt` and `en` files.
- **No automated tests:** verification cycle is `npm run build` + manual toggle, consistent with spec.
- **Leftover-string risk:** Task 11 adds a grep sweep to catch missed strings.
