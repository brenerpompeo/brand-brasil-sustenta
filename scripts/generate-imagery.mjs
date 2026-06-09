/**
 * generate-imagery.mjs — gera imagens de marca via fal.ai (API direta, sem MCP).
 * Lê a FAL_KEY de ~/.config/brand-bs/.fal-key (perm 600). Estética travada (DS v6).
 * Uso: node scripts/generate-imagery.mjs [schnell|dev|pro]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const KEY = readFileSync(join(homedir(), ".config/brand-bs/.fal-key"), "utf8").trim();
const tier = process.argv[2] || "schnell";
const MODEL = { schnell: "fal-ai/flux/schnell", dev: "fal-ai/flux/dev", pro: "fal-ai/flux-pro/v1.1" }[tier];

const STYLE = ", documentary editorial photography, desaturated, low contrast, natural light, serious mood, real Brazilian context, cinematic shadows, grain, shot on 35mm, no text, no logos, not stock, not corporate";

const SET = [
  { id: "hero-empresa", ar: "16:9", p: "young Brazilian university students collaborating on a sustainability project in a modern office, looking at data on a screen" },
  { id: "hero-jovem", ar: "16:9", p: "a focused young Brazilian university student working on a laptop in a campus library at dusk" },
  { id: "hero-prefeitura", ar: "16:9", p: "aerial view of a mid-size Brazilian city at golden hour, civic buildings and green areas" },
  { id: "hero-universidade", ar: "16:9", p: "Brazilian university campus exterior, students walking, brutalist architecture, late afternoon" },
  { id: "atmosphere-territorio", ar: "1:1", p: "abstract aerial of Brazilian territory, rivers and urban grid, dark tones, topographic feel" },
  { id: "atmosphere-esg", ar: "1:1", p: "hands working with soil and a young seedling, close-up, documentary, dark background" },
];

mkdirSync("brand-imagery/raw", { recursive: true });

for (const s of SET) {
  const body = { prompt: s.p + STYLE, image_size: s.ar === "16:9" ? "landscape_16_9" : "square_hd", num_images: 1 };
  process.stdout.write(`gerando ${s.id} (${tier})... `);
  const r = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { "Authorization": `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) { console.log("ERRO", r.status, await r.text()); continue; }
  const data = await r.json();
  const url = data.images?.[0]?.url;
  if (!url) { console.log("sem url", JSON.stringify(data).slice(0,200)); continue; }
  const img = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`brand-imagery/raw/${s.id}.jpg`, img);
  console.log(`✓ (${(img.length/1024).toFixed(0)}KB)`);
}
console.log("Pronto. Otimize com: node scripts/treat-imagery.mjs");
