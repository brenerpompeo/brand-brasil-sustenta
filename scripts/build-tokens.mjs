/**
 * build-tokens.mjs — gera CSS a partir de tokens.json (fonte única da verdade).
 *
 * Saídas:
 *   src/generated/tokens.css   → consumido pelo brand guide (este repo)
 *   dist-tokens/brand-tokens.css → artefato para o produto consumir (sync)
 *
 * Uso: node scripts/build-tokens.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "src/data/tokens.json"), "utf8"));

const lines = [];
lines.push(`/* AUTO-GERADO de src/data/tokens.json — NÃO editar à mão. */`);
lines.push(`/* Fonte: ${tokens._meta.name} v${tokens._meta.version} · ${tokens._meta.snapshot} */`);
lines.push(`@theme {`);

// Tipografia
for (const [, f] of Object.entries(tokens.typography.families)) {
  lines.push(`  ${f.var}: ${f.stack};`);
}
// Cores
for (const group of ["base", "persona", "status"]) {
  for (const c of tokens.color[group]) lines.push(`  ${c.var}: ${c.hex ?? c.value};`);
}
for (const c of tokens.color.border) lines.push(`  ${c.var}: ${c.value};`);
// Radius
for (const r of tokens.radius) lines.push(`  ${r.var}: ${r.value};`);
lines.push(`}`);
const css = lines.join("\n") + "\n";

mkdirSync(join(root, "src/generated"), { recursive: true });
writeFileSync(join(root, "src/generated/tokens.css"), css);

mkdirSync(join(root, "dist-tokens"), { recursive: true });
writeFileSync(join(root, "dist-tokens/brand-tokens.css"), css);

// Artefato COMMITAVEL — consumido pelo produto via raw.githubusercontent
mkdirSync(join(root, "tokens"), { recursive: true });
writeFileSync(join(root, "tokens/brand-tokens.css"), css);

// Também emite JSON plano (chave→hex) para Figma Tokens / outros consumidores
const flat = {};
for (const group of ["base", "persona", "status"]) for (const c of tokens.color[group]) flat[c.var] = c.hex ?? c.value;
for (const c of tokens.color.border) flat[c.var] = c.value;
writeFileSync(join(root, "dist-tokens/tokens.flat.json"), JSON.stringify(flat, null, 2) + "\n");

console.log(`✓ tokens gerados: ${Object.keys(flat).length} cores + tipografia + radius`);
console.log(`  → src/generated/tokens.css`);
console.log(`  → dist-tokens/brand-tokens.css`);
console.log(`  → dist-tokens/tokens.flat.json`);
