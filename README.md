# Brand Brasil Sustenta

> Sistema de marca **vivo** do Brasil Sustenta — não é PDF, é um guia que renderiza dos mesmos design tokens que o produto usa.

**Direção:** Editorial High-End Pátria (Studio Namma / Saint Nerona) · **Versão:** 6.0

## O que é

Guia de marca navegável (Camada 5 do Brand CMS) cobrindo:
- **Fundação** — propósito, posicionamento, território, arquitetura de marca
- **Logo** — construção, versões, usos proibidos
- **Cores** — paleta semântica por persona, copy-to-clipboard de HEX e `var()`
- **Tipografia** — escala Antonio / Outfit / Geist Mono
- **Componentes** — ODS badges, botões, Fit Score Card (vivos, não screenshots)
- **Voz** — glossário sempre/nunca, frase de compra
- **Governança** — níveis de flexibilidade, fonte da verdade

## Fonte da verdade (zero drift)

```
src/data/tokens.json          ← single source deste guia
  ↕ sincronizado com
../brasil-sustenta/apps/web/src/index.css   ← tokens do produto (DS v6)
```

Estratégia, voz e governança completas vivem no **Brand CMS (Obsidian)**:
`Second-Brain/20-Areas/20.02-Brasil-Sustenta-Venture/Brand/`

## Stack

React 19 · TypeScript · Vite · Tailwind v4 — self-owned, zero SaaS (substitui Zeroheight/Frontify).

## Dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
```

## Deploy

Estático — Vercel, GitHub Pages ou qualquer host. `base: "./"` já configurado para subpaths.

---

🤖 Gerado com [Claude Code](https://claude.com/claude-code)
