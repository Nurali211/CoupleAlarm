# Together — Paylaşılan Zəng Sistemi

React + Vite + TypeScript + Tailwind. AZ / EN / RU, açıq/tünd tema, OTP giriş (demo), Basic / Pro / Ultimate planlar.

## VS Code ilə işə salma

1. `couple-alarm.zip` faylını açın və qovluğu VS Code-da açın (File → Open Folder).
2. Terminal açın (Ctrl + `) və yazın:

```bash
npm install
npm run dev
```

3. Brauzerdə `http://localhost:5173` ünvanını açın.

Demo giriş kodu: `123456`

## Qovluq quruluşu

- `src/components` — Header, BottomNav, AlarmCard, AlarmForm, modallar
- `src/pages` — Alarms, People, Plans, Profile
- `src/context` — AppContext (dil, tema, giriş, planlar, zənglər)
- `src/i18n` — AZ / EN / RU tərcümələr
- `src/services/auth.ts` — OTP simulyasiyası (real API ilə əvəz edin)
- `src/data/mock.ts` — nümunə partnyor və zənglər

Bütün fayllar kod şəklində `FILES.md`-dədir.
