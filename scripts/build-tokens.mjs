/**
 * build-tokens.mjs — Compilador multi-target de design tokens do Brasil Sustenta.
 * Fonte única da verdade (SSOT): src/data/tokens.json
 *
 * Saídas geradas:
 *   - src/generated/tokens.css     → Consumido localmente pelo Tailwind v4 (@theme)
 *   - dist-tokens/brand-tokens.css → Artefato CSS exportável para o ecossistema
 *   - tokens/brand-tokens.css      → Espelho commitável para sincronização externa
 *   - dist-tokens/tokens.flat.json → Dicionário plano (var -> valor) para Figma / tooling
 *   - dist-tokens/tokens.js        → Módulo ES exportável com tokens estruturados
 *   - dist-tokens/tokens.d.ts      → Declarações TypeScript com tipagem estrita
 *
 * Uso: node scripts/build-tokens.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "src/data/tokens.json"), "utf8"));

// 1. GERAÇÃO DO CSS (@theme do Tailwind v4)
const lines = [];
lines.push(`/* AUTO-GERADO de src/data/tokens.json — NÃO editar manualmente. */`);
lines.push(`/* Fonte: ${tokens._meta.name} v${tokens._meta.version} · ${tokens._meta.direction} */`);
lines.push(`/* Snapshot: ${tokens._meta.snapshot} */`);
lines.push(``);
lines.push(`@theme {`);

// Tipografia
lines.push(`  /* Tipografia */`);
for (const [, f] of Object.entries(tokens.typography.families)) {
  lines.push(`  ${f.var}: ${f.stack};`);
}
lines.push(``);

// 3 Camadas de Elevação Tonal Cirdia & Neutros Ink
lines.push(`  /* 3 Camadas de Elevação Tonal Cirdia & Neutros */`);
for (const c of tokens.color.base) {
  lines.push(`  ${c.var}: ${c.hex ?? c.value};`);
}
lines.push(``);

// Cores Pátria & Variantes Soft
lines.push(`  /* Cores Pátria High-End & Variantes Soft */`);
for (const c of tokens.color.persona) {
  lines.push(`  ${c.var}: ${c.hex ?? c.value};`);
}
for (const c of tokens.color.status) {
  lines.push(`  ${c.var}: ${c.hex ?? c.value};`);
}
lines.push(``);

// Hairlines & Bordas
lines.push(`  /* Hairlines Suíças 1px */`);
for (const c of tokens.color.border) {
  lines.push(`  ${c.var}: ${c.value};`);
}
lines.push(``);

// Raios de Arredondamento (Radius)
if (Array.isArray(tokens.radius)) {
  lines.push(`  /* Raios de Arredondamento */`);
  for (const r of tokens.radius) {
    lines.push(`  ${r.var}: ${r.value};`);
  }
  lines.push(``);
}

// ODS 1 a 18
if (Array.isArray(tokens.ods)) {
  lines.push(`  /* Cores Agenda ODS 1 a 18 */`);
  for (const o of tokens.ods) {
    lines.push(`  ${o.var}: ${o.hex};`);
  }
  lines.push(``);
}

// Glassmorphism & Liquid Glass
if (Array.isArray(tokens.glass)) {
  lines.push(`  /* Glassmorphism Cirdia */`);
  for (const g of tokens.glass) {
    lines.push(`  ${g.var}: ${g.value};`);
  }
  lines.push(``);
}

// Gradientes Aurora Pátria & Bioluminescência
if (Array.isArray(tokens.gradient)) {
  lines.push(`  /* Gradientes Aurora Pátria & Bioluminescência */`);
  for (const g of tokens.gradient) {
    lines.push(`  ${g.var}: ${g.value};`);
  }
  lines.push(``);
}

// CTA Semânticos
if (Array.isArray(tokens.cta)) {
  lines.push(`  /* CTA Semânticos */`);
  for (const c of tokens.cta) {
    lines.push(`  ${c.var}: ${c.value};`);
  }
  lines.push(``);
}

// Motion & Easing
if (tokens.motion?.tokens && Array.isArray(tokens.motion.tokens)) {
  lines.push(`  /* Motion & Transições High-End */`);
  for (const m of tokens.motion.tokens) {
    lines.push(`  ${m.var}: ${m.value};`);
  }
  lines.push(``);
} else if (tokens.motion?.ease) {
  lines.push(`  /* Motion & Transições */`);
  lines.push(`  --ease-expo: ${tokens.motion.ease};`);
  lines.push(`  --duration-hover: 200ms;`);
  lines.push(`  --duration-press: 80ms;`);
  lines.push(`  --duration-release: 240ms;`);
  lines.push(`  --spring-damping: 0.85;`);
  lines.push(`  --spring-stiffness: 120;`);
  lines.push(``);
}

lines.push(`}`);
const css = lines.join("\n") + "\n";

// 2. SALVAR ARQUIVOS CSS
mkdirSync(join(root, "src/generated"), { recursive: true });
writeFileSync(join(root, "src/generated/tokens.css"), css);

mkdirSync(join(root, "dist-tokens"), { recursive: true });
writeFileSync(join(root, "dist-tokens/brand-tokens.css"), css);

mkdirSync(join(root, "tokens"), { recursive: true });
writeFileSync(join(root, "tokens/brand-tokens.css"), css);

// 3. GERAÇÃO DO DICIONÁRIO PLANO (dist-tokens/tokens.flat.json)
const flat = {};
for (const [, f] of Object.entries(tokens.typography.families)) flat[f.var] = f.stack;
for (const group of ["base", "persona", "status"]) {
  for (const c of tokens.color[group]) flat[c.var] = c.hex ?? c.value;
}
for (const c of tokens.color.border) flat[c.var] = c.value;
if (Array.isArray(tokens.radius)) {
  for (const r of tokens.radius) flat[r.var] = r.value;
}
if (Array.isArray(tokens.ods)) {
  for (const o of tokens.ods) flat[o.var] = o.hex;
}
if (Array.isArray(tokens.glass)) {
  for (const g of tokens.glass) flat[g.var] = g.value;
}
if (Array.isArray(tokens.gradient)) {
  for (const g of tokens.gradient) flat[g.var] = g.value;
}
if (Array.isArray(tokens.cta)) {
  for (const c of tokens.cta) flat[c.var] = c.value;
}
if (tokens.motion?.tokens && Array.isArray(tokens.motion.tokens)) {
  for (const m of tokens.motion.tokens) flat[m.var] = m.value;
}

writeFileSync(join(root, "dist-tokens/tokens.flat.json"), JSON.stringify(flat, null, 2) + "\n");

// 4. GERAÇÃO DO MÓDULO JS EXPORTÁVEL (dist-tokens/tokens.js)
const jsContent = `/**
 * @file tokens.js — Brasil Sustenta Design Tokens
 * Auto-gerado a partir de src/data/tokens.json.
 */

export const tokens = ${JSON.stringify(tokens, null, 2)};

export const flatTokens = ${JSON.stringify(flat, null, 2)};

export const colors = {
  base: ${JSON.stringify(tokens.color.base, null, 2)},
  persona: ${JSON.stringify(tokens.color.persona, null, 2)},
  status: ${JSON.stringify(tokens.color.status, null, 2)},
  border: ${JSON.stringify(tokens.color.border, null, 2)},
  ods: ${JSON.stringify(tokens.ods, null, 2)},
};

export const typography = ${JSON.stringify(tokens.typography, null, 2)};

export const radius = ${JSON.stringify(tokens.radius, null, 2)};

export const motion = ${JSON.stringify(tokens.motion, null, 2)};

export const glass = ${JSON.stringify(tokens.glass, null, 2)};

export const gradient = ${JSON.stringify(tokens.gradient, null, 2)};

export const cta = ${JSON.stringify(tokens.cta, null, 2)};

export const ods = ${JSON.stringify(tokens.ods, null, 2)};

export default tokens;
`;

writeFileSync(join(root, "dist-tokens/tokens.js"), jsContent);

// 5. GERAÇÃO DAS DECLARAÇÕES TYPESCRIPT (dist-tokens/tokens.d.ts)
const dtsContent = `/**
 * @file tokens.d.ts — Declarações TypeScript para Design Tokens Brasil Sustenta
 */

export interface TokenItem {
  name?: string;
  var: string;
  hex?: string;
  value?: string;
  label?: string;
  use?: string;
  persona?: string;
}

export interface TypographyFamily {
  var: string;
  stack: string;
  role: string;
}

export interface TypographyScaleItem {
  level: string;
  family: string;
  weight: string;
  size: string;
  tracking: string;
  transform: string;
}

export interface ODSItem {
  n: number;
  var: string;
  hex: string;
  label: string;
  shortLabel?: string;
}

export interface TokensMetadata {
  name: string;
  version: string;
  direction: string;
  source: string;
  snapshot: string;
  note: string;
}

export interface TokensSchema {
  _meta: TokensMetadata;
  color: {
    base: TokenItem[];
    persona: TokenItem[];
    status: TokenItem[];
    border: TokenItem[];
  };
  typography: {
    families: Record<string, TypographyFamily>;
    scale: TypographyScaleItem[];
  };
  radius: TokenItem[];
  motion: {
    ease: string;
    duration: string;
    properties: string;
    tokens?: TokenItem[];
  };
  glass?: TokenItem[];
  gradient?: TokenItem[];
  cta?: TokenItem[];
  ods: ODSItem[];
}

export declare const tokens: TokensSchema;
export declare const flatTokens: Record<string, string>;
export declare const colors: {
  base: TokenItem[];
  persona: TokenItem[];
  status: TokenItem[];
  border: TokenItem[];
  ods: ODSItem[];
};
export declare const typography: TokensSchema["typography"];
export declare const radius: TokenItem[];
export declare const motion: TokensSchema["motion"];
export declare const glass: TokenItem[];
export declare const gradient: TokenItem[];
export declare const cta: TokenItem[];
export declare const ods: ODSItem[];

export default tokens;
`;

writeFileSync(join(root, "dist-tokens/tokens.d.ts"), dtsContent);

console.log(`✓ tokens gerados com sucesso (${Object.keys(flat).length} variáveis CSS mapeadas):`);
console.log(`  → src/generated/tokens.css (Tailwind v4 @theme)`);
console.log(`  → dist-tokens/brand-tokens.css`);
console.log(`  → tokens/brand-tokens.css`);
console.log(`  → dist-tokens/tokens.flat.json`);
console.log(`  → dist-tokens/tokens.js`);
console.log(`  → dist-tokens/tokens.d.ts`);

