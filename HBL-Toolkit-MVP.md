# HBL Toolkit MVP

## Estrutura

```text
src/
├── app/
│   ├── page.tsx
│   ├── pomodoro/page.tsx
│   └── tabata/page.tsx
├── apps/
│   ├── pomodoro/config.ts
│   └── tabata/config.ts
├── components/timer/
│   ├── TimerRunner.tsx
│   ├── TimerDisplay.tsx
│   ├── TimerControls.tsx
│   └── ProgressBar.tsx
├── core/timer-engine/
│   ├── types.ts
│   ├── TimerEngine.ts
│   ├── useTimerEngine.ts
│   └── builders/
│       ├── createPomodoro.ts
│       └── createTabata.ts
└── utils/
    └── formatTime.ts
```

## Observação

Use os códigos consolidados da conversa para:
- types.ts
- TimerEngine.ts (versão requestAnimationFrame)
- useTimerEngine.ts
- createPomodoro.ts
- createTabata.ts
- formatTime.ts
- TimerDisplay.tsx
- TimerControls.tsx
- ProgressBar.tsx
- TimerRunner.tsx
- app/page.tsx
- app/pomodoro/page.tsx
- app/tabata/page.tsx

## Próximos passos

1. Adicionar eventos (stepStart, stepEnd, finish).
2. Adicionar CircularProgress SVG.
3. Adicionar sons.
4. Transformar em PWA.
5. Adicionar presets salvos.
6. Adicionar autenticação e plano PRO.
