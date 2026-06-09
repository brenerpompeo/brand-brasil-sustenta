# Sincronização de Marca → Produto

> Resposta a: "ao atualizarmos a marca, como as mudanças propagam para o site e web app do Brasil Sustenta?"

## Fonte única da verdade

```
src/data/tokens.json   ← VOCÊ EDITA AQUI (cor, tipografia, radius)
        │  node scripts/build-tokens.mjs
        ├─► src/generated/tokens.css        → o brand guide (este repo)
        └─► dist-tokens/brand-tokens.css     → artefato para o produto
            dist-tokens/tokens.flat.json     → Figma Tokens / outros
```

**Editar token = editar `tokens.json` e nada mais.** O `prebuild`/`predev` regenera o CSS automaticamente.

## Como propaga para o produto (3 estratégias)

### 1. Manual local (já funciona hoje)
```bash
npm run tokens:build
cp dist-tokens/brand-tokens.css "../brasil-sustenta/apps/web/src/brand-tokens.generated.css"
```
Depois, no produto, importar uma vez em `index.css`:
```css
@import "./brand-tokens.generated.css";
```
As primitivas (--color-leaf, --font-impact…) passam a vir da marca; os mapeamentos semânticos do produto continuam.

### 2. Automático via PR (escalável — recomendado)
`.github/workflows/sync-tokens.yml` dispara quando `tokens.json` muda no `main`:
- gera o CSS
- abre PR no `brasil-sustenta` com o `brand-tokens.generated.css` atualizado
- humano revisa e mergeia (gate 🟡 da governança)

**Requer:** secret `PRODUCT_REPO_TOKEN` (PAT escopo `repo`) nas settings deste repo, e ajustar `PRODUCT_REPO` no workflow para o remote real do produto.

### 3. Pacote npm compartilhado (futuro, multi-app)
Publicar `@brasil-sustenta/tokens` → site, web app, mobile e SDK consomem a mesma versão. Vale quando houver 3+ superfícies.

## Direção do canon

| Hoje | Recomendado |
|------|-------------|
| `index.css` do produto é canônico; este repo espelha | `tokens.json` (este repo) vira canônico; produto consome via PR |

Migrar para o modelo recomendado = uma edição no `index.css` do produto (importar o gerado) + ativar o workflow. Gate 🟡 — co-aprovação do Brand Owner.
