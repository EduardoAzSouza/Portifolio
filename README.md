# Portfólio — Eduardo Souza

[![Site ao vivo](https://img.shields.io/badge/site%20ao%20vivo-eduardoazsouza.github.io-7ce0cd?style=flat-square)](https://eduardoazsouza.github.io/Portifolio/)
[![GitHub Pages](https://img.shields.io/badge/hospedado%20em-GitHub%20Pages-0b1222?style=flat-square)](https://pages.github.com/)

![Prévia do portfólio](images/og-image.jpg)

Portfólio pessoal de **Eduardo Souza**, Engenheiro de Software focado em **.NET, arquitetura de microsserviços, integração de IA em tempo real e cloud (AWS, Docker, Kubernetes)**.

🔗 **Acesse:** [eduardoazsouza.github.io/Portifolio](https://eduardoazsouza.github.io/Portifolio/)

---

## Seções

- **Apresentação** — resumo profissional e terminal interativo com o perfil
- **Informações Técnicas** — stack organizada por frente de atuação
- **Experiência** — trajetória com cases reais (Sol Agora, Cursale) e diagrama de arquitetura gerado por script
- **Projetos** — produtos em produção com screenshots e galeria
- **Formação** — graduação, certificações e idiomas
- **Contato** — e-mail, WhatsApp, LinkedIn e GitHub

## Stack

| Camada | Tecnologia |
| --- | --- |
| Estrutura | HTML5 semântico |
| Estilo | CSS3 puro (custom properties, grid, flexbox, `prefers-reduced-motion`) |
| Interação | JavaScript vanilla (IntersectionObserver, scroll spy, menu mobile) |
| Tipografia | Space Grotesk + Manrope (Google Fonts) |
| Ícones | Font Awesome |
| Hospedagem | GitHub Pages |

Sem framework, sem build — propositalmente leve e rápido.

## Destaques técnicos

- **SEO**: Open Graph, Twitter Cards, JSON-LD (schema.org/Person), `sitemap.xml`, `robots.txt`, canonical
- **Acessibilidade**: skip link, `aria-*` na navegação, foco visível, respeito a `prefers-reduced-motion`
- **Performance**: imagens WebP com `width`/`height` (sem CLS), lazy loading, CSS/JS minificáveis e sem dependências pesadas
- **Diagrama de arquitetura** (`images/sol-agora-backend-diagram.webp`): gerado programaticamente em Python/Pillow, com supersampling 2x

## Estrutura

```
├── index.html              # página única
├── styles.css              # estilos
├── script.js               # interações
├── images/                 # WebP otimizados + og-image
├── docs/                   # currículo em PDF (demais arquivos ignorados no git)
├── robots.txt / sitemap.xml
└── assets-src/             # (não versionado) scripts Python e fontes usados p/ gerar assets
```

## Rodando localmente

Não há build — basta abrir o `index.html` ou servir a pasta:

```powershell
python -m http.server 8000
# http://localhost:8000
```

---

© Eduardo Souza · [LinkedIn](https://www.linkedin.com/in/eduardoazsouza/) · [GitHub](https://github.com/EduardoAzSouza)
