# PB Finanses — Setup Guide

## 1. Fotogrāfijas (SVARĪGI — pirmais solis)

Saglabā 3 Agneses fotogrāfijas šajā mapē:
```
pb-finanses/
└── public/
    └── images/
        ├── agnese-1.png   ← foto ar grāmatu (smaida)
        ├── agnese-2.png   ← foto ar planšeti (sānis)
        └── agnese-3.png   ← trešā foto
```

Ja faili ir JPG formātā — izmanto `.jpg` un atjaunini `Hero.tsx` failā PHOTOS masīvu.

## 2. Instalē atkarības

```bash
cd pb-finanses
npm install
```

## 3. Palaid lokāli

```bash
npm run dev
```

Atver: http://localhost:3000

## 4. Valodas

- http://localhost:3000/lv — latviešu (noklusējums)
- http://localhost:3000/en — angļu
- http://localhost:3000/ru — krievu

## 5. Datu bāze (vēlāk)

Kad būs nepieciešams:
```bash
# Pievieno DATABASE_URL mainīgo .env failā
echo "DATABASE_URL=postgresql://user:pass@host:5432/pbfinanses" > .env

# Migrē shēmu
npm run db:push
```

## 6. Vercel deployment

```bash
npm install -g vercel
vercel
```

## Projekta struktūra

```
src/
├── app/[locale]/          ← LV/EN/RU lapas
├── components/
│   ├── layout/            ← Navbar, Footer, AnnouncementBar
│   └── sections/          ← Hero, Sectors, Services, Testimonials, Founder, Process, Insights, Contact
├── i18n/messages/         ← lv.json, en.json, ru.json
└── lib/fonts.ts           ← Cormorant Garamond + Inter + JetBrains Mono
```
