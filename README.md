# 🌿 Pousada MontVerde — Site Oficial

Site estático boutique gerado pela Komplexa Hotéis.
Compatível com **GitHub Pages**, **Netlify**, **Vercel** e qualquer servidor web estático.

---

## 📁 Estrutura de arquivos

```
montverde/
├── index.html              ← Home (motor de reservas HQ Beds integrado)
├── sobre/
│   └── index.html          ← Página Sobre
├── acomodacoes/
│   └── index.html          ← 16 UHs em 9 categorias com filtros
├── galeria/
│   └── index.html          ← Galeria com lightbox e filtros
├── localizacao/
│   └── index.html          ← Mapa + atrações próximas
├── contato/
│   └── index.html          ← Formulário de contato + mapa embutido
├── assets/
│   ├── css/
│   │   └── style.css       ← Estilos globais + tokens de design
│   ├── js/
│   │   └── main.js         ← GSAP, Lenis, webhooks, modais, filtros
│   └── img/                ← ⚠️ Imagens a adicionar (ver lista abaixo)
└── README.md               ← Este arquivo
```

---

## 🖼️ Imagens necessárias

Adicione as imagens reais da pousada nos caminhos abaixo.
Formato recomendado: **JPG**, qualidade 80–85%, sem metadados EXIF.

| Caminho | Dimensão sugerida | Descrição |
|---|---|---|
| `assets/img/hero/fachada.jpg` | 1920×1080 | Foto principal — fachada ou área externa |
| `assets/img/sobre/entrada.jpg` | 1200×900 | Entrada / recepção da pousada |
| `assets/img/sobre/piscina.jpg` | 1600×900 | Área da piscina |
| `assets/img/quartos/queen.jpg` | 1200×900 | Duplo Cama Casal Queen (UHs 08–09) |
| `assets/img/quartos/casal.jpg` | 1200×900 | Duplo Cama Casal (UHs 01, 07, 16) |
| `assets/img/quartos/beliche-duplo.jpg` | 1200×900 | Duplo Beliche (UHs 05–06) |
| `assets/img/quartos/triplo-casal.jpg` | 1200×900 | Triplo Casal + Solteiro (UH 12) |
| `assets/img/quartos/triplo-beliche.jpg` | 1200×900 | Triplo Beliche (UHs 02, 03, 13) |
| `assets/img/quartos/quadruplo-beliche.jpg` | 1200×900 | Quádruplo Beliche + Box (UH 04) |
| `assets/img/quartos/quadruplo-casal.jpg` | 1200×900 | Quádruplo Casal + 2 Solteiros (UH 14) |
| `assets/img/quartos/sextuplo.jpg` | 1200×900 | Sêxtuplo Beliches (UHs 11, 15) |
| `assets/img/quartos/octuplo.jpg` | 1200×900 | Óctuplo Beliches (UH 10) |
| `assets/img/galeria/foto-01.jpg` a `foto-12.jpg` | 1200×900 | Fotos gerais da pousada |

> **Dica:** Use ferramentas como [Squoosh](https://squoosh.app) para comprimir as imagens antes de subir.

---

## ⚙️ Configurações a revisar

### 1. Google Maps — `contato/index.html`

Substitua o iframe do mapa pelo iframe real gerado no Google Maps:

1. Acesse [maps.google.com](https://maps.google.com)
2. Pesquise: **R. Itália Fausta, 105 — Itanhangá, Rio de Janeiro**
3. Clique em **Compartilhar → Incorporar um mapa**
4. Copie o `<iframe>` e substitua o que está em `contato/index.html` (trecho comentado)

### 2. Google Maps — `localizacao/index.html`

Mesmo processo acima. Há um comentário de marcação no HTML.

### 3. Motor de reservas HQ Beds — `index.html`

O widget já está integrado com o código fornecido:
```
https://admin.hqbeds.com.br/pt-br/hqb/2GLZMRDyqY/widget2?...
```
Se o código mudar, atualize o `src` do `<iframe>` na seção hero do `index.html`.

### 4. Webhook — `assets/js/main.js`

Todos os formulários (WhatsApp modal, popup de desconto, formulário de contato)
disparam para:
```
https://webhook.cidigitalmarketing.com/webhook/795f27d1-f878-4a73-8233-d3663db6d7a7
```
Verifique se este endpoint está ativo. Para atualizar, edite a constante no topo do `main.js`:
```js
const WEBHOOK_URL = 'https://webhook.cidigitalmarketing.com/webhook/SEU-ID-AQUI';
```

### 5. GTM — Todos os HTMLs

Tag Manager já configurado com o ID **GTM-MXDKKWH3** em todos os arquivos.
Verifique no painel do GTM se as tags de conversão estão publicadas.

### 6. Domínio e URL canônica

Atualize as tags `og:url` em cada HTML com o domínio final da pousada:
```
https://pousadamontverde.com.br/
https://pousadamontverde.com.br/sobre/
https://pousadamontverde.com.br/acomodacoes/
...
```

---

## 🚀 Deploy — GitHub Pages

```bash
# 1. Crie um repositório no GitHub (ex: pousada-montverde)
# 2. Faça upload de toda a pasta montverde/ como raiz do repositório

git init
git add .
git commit -m "feat: site inicial Pousada MontVerde"
git remote add origin https://github.com/SEU-USUARIO/pousada-montverde.git
git push -u origin main

# 3. No GitHub: Settings → Pages → Branch: main / root → Save
# 4. Site ficará disponível em: https://SEU-USUARIO.github.io/pousada-montverde/
```

### Deploy com domínio próprio (GitHub Pages)

Crie um arquivo `CNAME` na raiz com o conteúdo:
```
pousadamontverde.com.br
```
Configure o DNS do domínio apontando para os servidores do GitHub Pages.

---

## 🚀 Deploy — Netlify (alternativa rápida)

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Arraste a pasta `montverde/` para a área de deploy
3. Conecte seu domínio nas configurações
4. Pronto — HTTPS automático incluso

---

## 📋 Checklist pré-lançamento

- [ ] Imagens adicionadas em `assets/img/` (ver tabela acima)
- [ ] Google Maps iframe real inserido em `contato/` e `localizacao/`
- [ ] Webhook testado (formulário de contato + popup + WA modal)
- [ ] Motor de reservas HQ Beds funcionando no hero da home
- [ ] GTM publicado com tags de conversão ativas
- [ ] URL canônica atualizada em todos os `og:url`
- [ ] CNAME configurado (se usar domínio próprio)
- [ ] Teste mobile realizado (Chrome DevTools → responsivo)
- [ ] Teste de velocidade: [PageSpeed Insights](https://pagespeed.web.dev)

---

## 🎨 Tokens de design

| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#3c614f` | Verde primário — headers, botões, bordas |
| `--cta` | `#92783b` | Dourado — botão de reserva, destaques |
| `--bg` | `#f8f5f0` | Fundo geral (creme claro) |
| `--surface` | `#ffffff` | Cards, formulários |
| `--text` | `#232516` | Texto principal |
| `--text-muted` | `#6b6e5e` | Texto secundário |
| `--font-display` | Pinyon Script | Títulos H1–H3 |
| `--font-body` | Raleway | Corpo de texto, botões |

---

## 📞 Dados da pousada

| Campo | Valor |
|---|---|
| Nome | Pousada MontVerde |
| CNPJ | 63.165.135/0001-27 |
| Endereço | R. Itália Fausta, 105 — Itanhangá, RJ, 22641-440 |
| WhatsApp | +55 (21) 99691-5036 |
| E-mail | contato@pousadamontverde.com |
| Instagram | @pousada_montverde |

---

*Desenvolvido por [Komplexa Hotéis](https://komplexahoteis.com.br)*
