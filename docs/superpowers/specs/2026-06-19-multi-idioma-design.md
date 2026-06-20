# Suporte Multi-idioma (i18n) — Fase 1

**Data:** 2026-06-19
**Estado:** Aprovado para implementação

## Objetivo

Adicionar suporte a dois idiomas — Português (padrão) e Inglês — em toda a UI fixa do site público. O utilizador alterna o idioma através de um seletor na navbar; a escolha persiste entre visitas.

## Escopo

**Incluído (Fase 1):**
- Tradução de **todas** as strings fixas dos componentes e páginas em `src/components/main/**`, `src/pages/main/**` e `src/Layout/**`, incluindo dados estáticos como o `navData` do `Nav.tsx`.
- Seletor de idioma PT/EN na navbar.
- Deteção do idioma do browser na primeira visita + persistência em `localStorage`.

**Fora de escopo (fases futuras):**
- Conteúdo dinâmico do Supabase (blog, projetos, serviços, depoimentos, etc.) — permanece num único idioma.
- Painel admin (`src/components/admin/**`, `src/pages/admin/**`).
- Rotas com prefixo de idioma (ex.: `/en/work`). As URLs não mudam.

## Decisões de design

| Decisão | Escolha | Razão |
|---|---|---|
| Idiomas | PT + EN | Par mais comum para portfólio; site atual em PT. |
| Idioma padrão / fallback | `pt` | Conteúdo de origem está em português. |
| Persistência | `localStorage` (chave `i18nextLng`) | Sem reestruturar rotas; suficiente para portfólio. |
| Deteção 1ª visita | `localStorage → navigator` | Respeita preferência guardada, depois o browser. |
| Tradução de conteúdo Supabase | Não (fase 1) | Evita mudanças na BD e no admin nesta fase. |

## Arquitetura

### Dependências novas
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

### Inicialização — `src/lib/i18n.ts`
Configura e exporta a instância `i18next`:
- `fallbackLng: 'pt'`
- `supportedLngs: ['pt', 'en']`
- `detection`: ordem `['localStorage', 'navigator']`, `caches: ['localStorage']`, chave `i18nextLng`.
- `interpolation.escapeValue: false` (React já escapa).
- Carrega os recursos (namespaces) importados estaticamente dos ficheiros JSON.
- `defaultNS: 'common'`.

Importado uma única vez em `src/main.tsx`, antes do `ReactDOM.createRoot(...).render(...)`. Não é necessário Provider adicional — `react-i18next` usa a instância global.

### Ficheiros de tradução — `src/locales/{pt,en}/<namespace>.json`
Divididos por namespace, espelhando a estrutura do site:

| Namespace | Cobre |
|---|---|
| `common` | Botões, labels e termos partilhados (ex.: "Ver mais", "Download CV"). |
| `nav` | Itens de navegação (`navData`). |
| `home` | Secções da home: hero, sobre, qualidades, techs, serviços, projetos, clientes, depoimentos. |
| `about` | Página Sobre (experiência, certificados, texto). |
| `services` | Página de Serviços. |
| `work` | Página de Trabalhos e detalhes. |
| `blog` | Página de Blog (UI fixa; títulos/conteúdo dos posts ficam fora de escopo). |
| `contact` | Página de Contactos (labels do formulário, mensagens). |
| `footer` | Rodapé. |

PT é a fonte da verdade. EN traduzido a partir do PT. As chaves são iguais nos dois idiomas.

### Seletor de idioma — `src/components/main/ui/LanguageSwitcher.tsx`
- Componente toggle PT/EN.
- Usa `useTranslation()` → `i18n.changeLanguage('pt' | 'en')`; o detector persiste automaticamente em `localStorage`.
- Indica o idioma ativo visualmente, no estilo da UI existente (Tailwind).
- Colocado em `src/components/main/Header.tsx`, dentro da `<nav>` atualmente vazia, ao lado do logo.

### Migração das strings
Em cada ficheiro de `components/main`, `pages/main` e `Layout`:
1. Substituir texto fixo PT por `t('namespace:chave')` via hook `useTranslation('<namespace>')`.
2. Mover dados estáticos com texto (ex.: `navData`, arrays `highlights`/`stats` em `HomeAboutSection`) para usarem `t()` — ou construir os arrays dentro do componente após obter `t`.
3. Garantir que cada string fica registada no JSON PT **e** EN.

## Fluxo de dados

```
1ª visita → languagedetector lê navigator → escolhe pt/en → render com t()
Utilizador clica no LanguageSwitcher → i18n.changeLanguage(x) → React re-render → localStorage atualizado
Visita seguinte → languagedetector lê localStorage → idioma anterior
```

## Tratamento de erros / edge cases
- Idioma não suportado detetado → cai para `fallbackLng: 'pt'`.
- Chave de tradução em falta → i18next devolve a própria chave; o fallback PT cobre chaves ausentes no EN. Durante o dev, ativar `debug: true` ou `saveMissing` opcional para apanhar chaves em falta (não em produção).

## Testes / verificação
Projeto não tem suite de testes automatizados. Verificação manual:
1. `npm run build` passa (TypeScript + Vite).
2. Carregar o site: textos aparecem em PT por omissão.
3. Clicar no seletor → todos os textos de main/Layout mudam para EN.
4. Recarregar a página → idioma escolhido persiste.
5. Limpar `localStorage` e abrir com browser configurado em EN → site abre em EN.
6. Inspecionar visualmente cada página (home, sobre, serviços, trabalhos, blog, contactos) em ambos os idiomas — nenhuma string fixa em falta.

## Riscos
- Volume de strings: ~58 ficheiros com texto. A migração é mecânica mas extensa; o piloto (home + nav) valida o padrão antes de propagar.
- Mistura PT/EN no conteúdo atual (alguns títulos já em inglês): durante a migração, normalizar para PT a chave PT e fornecer o equivalente EN correto.
