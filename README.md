# Calculadora de IMC

Aplicação web para cálculo do Índice de Massa Corporal (IMC), com interface "Premium Dark Mode" (glassmorphism), feita com React, Vite e Tailwind CSS.

O usuário informa altura (cm) e peso (kg) — o nome é opcional — e recebe o IMC com a classificação correspondente, incluindo badge colorida, barra de progresso e uma orientação.

## Faixas de classificação

| IMC         | Classificação |
| ----------- | ------------- |
| < 18,5      | Magreza       |
| 18,5 – 24,9 | Peso normal   |
| 25,0 – 29,9 | Sobrepeso     |
| >= 30,0     | Obesidade     |

## Tecnologias

- React 18
- Vite 5
- Tailwind CSS 3

## Como rodar

```bash
npm install
npm run dev
```

A aplicação fica disponível na URL exibida pelo Vite (por padrão `http://localhost:5173`).

## Scripts

- `npm run dev` — servidor de desenvolvimento com HMR
- `npm run build` — build de produção
- `npm run preview` — pré-visualiza o build
- `npm run lint` — checagem com ESLint
