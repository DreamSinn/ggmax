# GGMMAX Tools - Brainstorming de Design

## Contexto
Aplicação web para cálculo de taxas e geração de preços ideais em uma plataforma de marketplace de games. A interface deve transmitir confiança, profissionalismo e eficiência, com foco em usuários que realizam operações financeiras críticas.

---

## Abordagem 1: Cyberpunk Minimalista
**Probabilidade:** 0.08

### Design Movement
Cyberpunk futurista com minimalismo funcional — inspirado em interfaces de ficção científica, mas mantendo clareza extrema.

### Core Principles
- **Contraste Agressivo:** Preto profundo com acentos neon (cyan, magenta, verde)
- **Tipografia Técnica:** Fontes monoespaciais para dados, sans-serif bold para títulos
- **Transparência e Camadas:** Uso de `backdrop-filter` e sobreposições semitransparentes para criar profundidade
- **Grid Estruturado:** Linhas e divisores geométricos que reforçam a sensação de controle

### Color Philosophy
- **Fundo:** Preto quase puro (`oklch(0.08 0 0)`)
- **Acentos Primários:** Cyan (`oklch(0.6 0.25 200)`) para ações principais
- **Acentos Secundários:** Magenta (`oklch(0.55 0.28 320)`) para alertas/atenção
- **Texto:** Branco com alto contraste (`oklch(0.95 0 0)`)
- **Intenção Emocional:** Transmitir poder, tecnologia e controle absoluto

### Layout Paradigm
- **Dashboard Assimétrico:** Painel esquerdo com navegação vertical, área principal com cards flutuantes
- **Diagonal Cuts:** Usar `clip-path` com ângulos para criar divisões dinâmicas entre seções
- **Floating Cards:** Elementos flutuam sobre o fundo com sombras neon

### Signature Elements
1. **Borda Neon Animada:** Cards com borda que "pisca" em cyan
2. **Indicadores de Status:** Pequenos dots animados que indicam estado (ativo/inativo)
3. **Linhas Geométricas:** Divisores com padrões de grade ou linhas diagonais

### Interaction Philosophy
- **Hover Glow:** Elementos ganham aura neon ao passar o mouse
- **Cliques Responsivos:** Feedback visual imediato com pulsos de cor
- **Transições Suaves:** Todas as mudanças de estado com `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Animation
- **Entrada de Cards:** Fade-in com slide lateral (300ms)
- **Hover em Botões:** Aura neon que expande e contrai
- **Atualização de Valores:** Números que "flipam" com efeito de contador
- **Loading State:** Linha neon que se move horizontalmente

### Typography System
- **Display/Títulos:** `IBM Plex Mono` Bold (700) para impacto
- **Corpo:** `IBM Plex Mono` Regular (400) para dados
- **Botões:** `IBM Plex Mono` Medium (500)
- **Hierarquia:** Tamanhos: 32px (h1), 24px (h2), 16px (body), 12px (caption)

---

## Abordagem 2: Minimalismo Corporativo Moderno
**Probabilidade:** 0.07

### Design Movement
Design corporativo contemporâneo com influência de startups tech — limpo, profissional, mas com personalidade.

### Core Principles
- **Espaço Generoso:** Amplo whitespace para respirar
- **Hierarquia Clara:** Tipografia e cores definem prioridade visual
- **Componentes Modulares:** Cards e seções bem definidas
- **Suavidade:** Cantos arredondados, sombras suaves, sem arestas agressivas

### Color Philosophy
- **Fundo:** Branco puro com tons de cinza muito claros (`oklch(0.98 0 0)`)
- **Primário:** Azul profissional (`oklch(0.55 0.2 250)`)
- **Secundário:** Verde menta suave (`oklch(0.7 0.12 160)`)
- **Texto:** Cinza escuro (`oklch(0.3 0.02 0)`)
- **Intenção Emocional:** Confiança, clareza, profissionalismo

### Layout Paradigm
- **Sidebar Persistente:** Navegação esquerda com ícones e rótulos
- **Main Content Centrado:** Área principal com max-width, cards empilhados verticalmente
- **Seções Bem Definidas:** Cada calculadora em seu próprio card com borda sutil

### Signature Elements
1. **Ícones Customizados:** Ícones simples e geométricos para cada tipo de anúncio
2. **Badges de Status:** Pequenos badges coloridos indicando tipo de plano
3. **Gradientes Suaves:** Gradientes lineares muito suaves como fundo de headers

### Interaction Philosophy
- **Hover Sutil:** Elevação leve (sombra aumenta)
- **Feedback Tátil:** Transições suaves sem surpresas
- **Estados Claros:** Disabled, active, hover bem diferenciados

### Animation
- **Entrada:** Fade-in suave (200ms)
- **Hover:** Elevação com aumento de sombra
- **Focus:** Anel de cor ao redor de inputs
- **Transições:** `transition: all 0.2s ease-out`

### Typography System
- **Display:** `Poppins` Bold (700) para títulos principais
- **Corpo:** `Inter` Regular (400) para conteúdo
- **Botões:** `Inter` Medium (600)
- **Hierarquia:** 28px (h1), 20px (h2), 14px (body), 12px (caption)

---

## Abordagem 3: Glassmorphism Dinâmico
**Probabilidade:** 0.09

### Design Movement
Glassmorphism com elementos dinâmicos — vidro translúcido, gradientes suaves, efeito de profundidade moderna.

### Core Principles
- **Transparência Estratégica:** Fundo com imagem/padrão, elementos com `backdrop-filter: blur()`
- **Gradientes Fluidos:** Gradientes radiais e lineares que criam movimento
- **Profundidade em Camadas:** Múltiplas camadas de vidro em diferentes níveis
- **Cores Vibrantes mas Suaves:** Tons pastel com saturação moderada

### Color Philosophy
- **Fundo Base:** Gradiente de azul para roxo (`oklch(0.15 0.1 280)` a `oklch(0.25 0.12 250)`)
- **Vidro Primário:** Branco com 10% opacidade sobre fundo
- **Acentos:** Gradiente de cyan para magenta
- **Texto:** Branco com sombra suave
- **Intenção Emocional:** Modernidade, elegância, movimento

### Layout Paradigm
- **Sobreposição de Camadas:** Cards flutuam em diferentes profundidades
- **Padrão Assimétrico:** Elementos não alinhados em grid rígido
- **Espaço Negativo Dinâmico:** Áreas vazias que parecem "respirar"

### Signature Elements
1. **Orbes Animadas:** Formas circulares que se movem suavemente no fundo
2. **Borda de Vidro:** Cards com borda branca semitransparente
3. **Efeito Glow:** Elementos principais com glow suave colorido

### Interaction Philosophy
- **Interatividade Fluida:** Hover com mudança de opacidade e blur
- **Movimento Contínuo:** Animações que sugerem movimento mesmo em repouso
- **Feedback Visual Rico:** Múltiplas camadas de feedback

### Animation
- **Orbes de Fundo:** Movimento contínuo lento (20s de duração)
- **Entrada de Cards:** Slide-in com blur fade (400ms)
- **Hover:** Aumento de opacidade e redução de blur
- **Pulso de Glow:** Animação de glow que pulsa suavemente

### Typography System
- **Display:** `Outfit` Bold (700) para títulos
- **Corpo:** `DM Sans` Regular (400) para conteúdo
- **Botões:** `DM Sans` Medium (600)
- **Hierarquia:** 32px (h1), 22px (h2), 15px (body), 12px (caption)

---

## Próximos Passos

**Qual abordagem você prefere?**

1. **Cyberpunk Minimalista** - Futurista, agressivo, impactante
2. **Minimalismo Corporativo Moderno** - Profissional, confiável, clássico
3. **Glassmorphism Dinâmico** - Moderno, elegante, dinâmico

Após sua escolha, vou implementar EXATAMENTE a filosofia de design selecionada em toda a aplicação.
