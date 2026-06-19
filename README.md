# Race Companion

Ferramenta de apoio à estratégia em tempo real para provas de resistência de karts. Desenvolvida para a resistência de 7 horas do Kartódromo de Baltar.

## Funcionalidades

- **Configuração da prova** — define a duração da corrida, os pilotos e o tempo máximo de stint por piloto
- **Plano de stints automático** — distribui o tempo de pista pelos turnos usando water-filling, respeitando os limites de cada piloto e o regulamento
- **Cronograma editável** — ajusta o piloto e o tempo alvo de cada turno diretamente na tabela; os turnos seguintes atualizam em cascata
- **Rebalanceamento dinâmico** — ao dar entrada no pit, o tempo real do turno é registado e o delta redistribuído automaticamente pelos turnos pendentes; se os turnos existentes não chegarem para absorver o tempo restante, novos turnos são adicionados
- **Cronómetro de corrida** — controla o tempo global da prova, o tempo de stint do piloto em pista e a contagem decrescente dos 4 minutos de paragem obrigatória
- **Live timing** — integração com o feed Apex Timing do circuito; mostra a posição, última volta e diferença para o líder em tempo real
- **Sugestões de lastro** — calcula automaticamente a combinação de lastros para pilotos abaixo dos 80 kg (§10 do regulamento)

## Estrutura

```
raceCompanion/
├── backend/          # API REST + SSE (Fastify + TypeScript)
│   └── src/
│       ├── rules.ts        # Constantes do regulamento
│       ├── types.ts        # Interfaces partilhadas
│       ├── strategy.ts     # Solver de distribuição + rebalanceamento
│       ├── timer.ts        # Máquina de estados do cronómetro
│       ├── state.ts        # Singleton em memória da corrida
│       └── routes/         # Endpoints REST e SSE
└── frontend/         # Interface web (Next.js 16 + Tailwind + shadcn/ui)
    └── app/
        ├── page.tsx          # Página de configuração
        └── dashboard/        # Dashboard em tempo real
```

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Desenvolvimento

```bash
# Backend (porta 3001, reinicia automaticamente ao alterar ficheiros)
cd backend
npm run dev

# Frontend (porta 3000)
cd frontend
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para aceder à aplicação.

## Regulamento implementado (Kartódromo de Baltar — 7H)

| Regra | Valor |
|---|---|
| Duração da prova | 7 horas (configurável) |
| Paragens obrigatórias | 10 (→ 11 turnos) |
| Duração mínima da paragem | 4 minutos |
| Stint máximo por piloto | 45 minutos |
| Peso mínimo do piloto | 80 kg |
| Lastros disponíveis | 2,5 / 5 / 10 kg |

## Stack

| Camada | Tecnologias |
|---|---|
| Backend | Fastify, TypeScript, tsx |
| Testes | Vitest |
| Frontend | Next.js 16, React 19, Tailwind CSS, shadcn/ui |
| Estado | TanStack Query + SSE |
| Live timing | Apex Timing (WebSocket/scraping) |
