# Next.js Refactoring Plan - v0-Portfolio

## 🎯 Ziel

Die aktuelle monolithische Client-Side-Struktur in eine moderne Next.js 14 App Router Architektur
mit Server Components umwandeln.

---

## 📊 Aktueller Zustand - Probleme

- ❌ Gesamte Layout ist `'use client'` → kein SSR
- ❌ 850+ Zeilen Code in einer einzigen Datei
- ❌ Keine Komponentenaufteilung
- ❌ Client-seitige Logik vermischt mit Präsentation
- ❌ Keine Trennung von statischem und interaktivem Content
- ❌ Schlechte SEO (Client-rendered)
- ❌ Große Bundle-Size

---

## 🏗️ Neue Komponentenstruktur

```
components/
├── layout/
│   ├── Header.tsx          (Client - Navigation, Theme Toggle)
│   ├── Footer.tsx          (Server - Statischer Content)
│   └── FloatingCTA.tsx     (Client - Floating Button)
├── sections/
│   ├── HeroSection.tsx     (Server - mit Client-Buttons)
│   ├── AboutSection.tsx    (Server - mit Client-Animationen)
│   ├── SkillsSection.tsx   (Server - mit Client-Cards)
│   ├── ProjectsSection.tsx (Server - mit Client-Cards)
│   └── ContactSection.tsx  (Client - Form)
├── ui/
│   └── [bestehende shadcn Komponenten]
└── shared/
    ├── SectionWrapper.tsx  (Client - Scroll Animations)
    ├── SkillCard.tsx       (Client - Hover-Effekte)
    ├── ProjectCard.tsx     (Client - Hover-Effekte)
    └── PixelArtImage.tsx   (Client - Animation)
```

---

## ✅ Umsetzungsschritte

### Phase 1: Infrastruktur & Provider

- [x] **1.1** Theme Provider als separate Client Component erstellen
- [x] **1.2** Providers Component für Layout erstellen (Theme, etc.)
- [x] **1.3** Layout.tsx in Server Component umwandeln

### Phase 2: Layout Components

- [x] **2.1** Header Component erstellen (Client)
  - Navigation
  - Theme Toggle
  - Mobile Menu
  - Active Section Tracking
- [x] **2.2** Footer Component erstellen (Server)
  - Copyright Text aus Translations
- [x] **2.3** FloatingCTA Component erstellen (Client)
  - Mail Button mit Scroll-to-Contact

### Phase 3: Shared/Reusable Components

- [x] **3.1** PixelArtImage Component auslagern (Client)
- [x] **3.2** SectionWrapper Component erstellen (Client)
  - Scroll-Animationen (Framer Motion)
  - Viewport Detection
- [x] **3.3** SkillCard Component erstellen (Client)
  - Hover-Effekte
  - Icon-Display
- [x] **3.4** ProjectCard Component erstellen (Client)
  - Hover-Effekte
  - Image-Display mit Fallback

### Phase 4: Section Components

- [x] **4.1** HeroSection erstellen (Server mit Client-Buttons)
  - Animated Background (Client Sub-Component)
  - CTA Buttons (Client Sub-Component)
- [x] **4.2** AboutSection erstellen (Server)
  - Text Content (Server)
  - Social Links (Client Sub-Component)
  - PixelArtImage Integration
- [x] **4.3** SkillsSection erstellen (Server)
  - Skills Data aus Translations laden
  - SkillCard Integration
- [x] **4.4** ProjectsSection erstellen (Server)
  - Projects Data aus Translations laden
  - ProjectCard Integration
- [x] **4.5** ContactSection erstellen (Client)
  - Contact Form
  - Form Validation
  - Form Submission

### Phase 5: Page Integration

- [x] **5.1** page.tsx als Server Component erstellen
  - Alle Sections zusammenführen
  - Translations laden
  - Metadata definieren
- [x] **5.2** Layout.tsx finalisieren
  - Nur Provider und Basis-Layout
  - Metadata Template

### Phase 6: Testing & Optimization

- [ ] **6.1** Funktionalität testen
  - Navigation
  - Theme Toggle
  - Scroll Animations
  - Form
- [ ] **6.2** Performance messen
  - Lighthouse Score
  - Bundle Size
  - Load Time
- [ ] **6.3** SEO überprüfen
  - Meta Tags
  - Structured Data
  - Crawlability

### Phase 7: Cleanup

- [ ] **7.1** Alte layout.tsx Datei löschen/archivieren
- [ ] **7.2** Ungenutzte Imports entfernen
- [ ] **7.3** Code-Formatierung & Linting
- [ ] **7.4** Dokumentation aktualisieren

---

## 🎨 Design Principles

### Server Components (Default)

- ✅ Translations laden
- ✅ Statische Daten vorbereiten
- ✅ SEO Metadata
- ✅ Initial HTML rendern

### Client Components (Nur wo nötig)

- ✅ Theme Toggle
- ✅ Navigation State
- ✅ Scroll Tracking
- ✅ Animations (Framer Motion)
- ✅ Form Handling
- ✅ User Interactions

### Best Practices

- ✅ Server Components als Standard
- ✅ Client Components nur bei `useState`, `useEffect`, Event Handlers
- ✅ Prop Drilling vermeiden mit Composition
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ TypeScript für Type Safety
- ✅ Tailwind für Styling

---

## 📈 Erwartete Verbesserungen

### Performance

- **Initial Load:** 40-60% schneller (SSR)
- **Time to Interactive:** Deutlich reduziert
- **Bundle Size:** Kleinere Client-Bundles
- **Core Web Vitals:** Bessere Scores

### SEO

- **Crawlability:** 100% (Server-rendered HTML)
- **Meta Tags:** Proper Metadata
- **Structured Data:** Schema.org Integration möglich

### Developer Experience

- **Code-Organisation:** Modulare Komponenten
- **Wartbarkeit:** Einzelne Verantwortlichkeiten
- **Testbarkeit:** Isolierte Units
- **Wiederverwendbarkeit:** Komponenten-Library

---

## 🚀 Start der Umsetzung

**Status:** Bereit **Geschätzter Aufwand:** 2-3 Stunden **Priorität:** Hoch

---

## 📝 Notizen

- Alle Komponenten mit TypeScript + Strict Mode
- Framer Motion nur in Client Components
- next-intl Server-seitig für SSR nutzen
- Alle Images optimiert (next/image wo möglich)
