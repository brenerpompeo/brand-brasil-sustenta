/**
 * treat-imagery.mjs — otimiza imagens cruas para web (DS v6).
 * Redimensiona para larguras-alvo e exporta JPG otimizado. macOS sips.
 * O tratamento visual (dessaturar/overlay escuro/grão) é aplicado em CSS no consumo.
 * Uso: node scripts/treat-imagery.mjs
 */
import { readdirSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

mkdirSync("public/imagery", { recursive: true });
const raw = readdirSync("brand-imagery/raw").filter(f => /\.(jpg|jpeg|png)$/i.test(f));
for (const f of raw) {
  const base = f.replace(/\.[^.]+$/, "");
  const w = f.includes("hero") ? 1600 : 1024;   // heros maiores, atmosferas menores
  const out = `public/imagery/${base}.jpg`;
  execSync(`sips -s format jpeg -s formatOptions 78 -Z ${w} "brand-imagery/raw/${f}" --out "${out}"`, { stdio: "ignore" });
  console.log(`✓ ${out} (${w}px)`);
}
console.log("Otimizado em public/imagery/");
