# AI Coding Instructions for v0-Portfolio

## Project Architecture

This is a **Next.js 14 portfolio website** with internationalization (i18n) built using v0.app. Key
architectural decisions:

- **App Router** with nested layouts (`app/[locale]/layout.tsx` wraps all pages)
- **next-intl** for i18n with middleware-level locale routing (`/en/`, `/de/`)
- **Radix UI + Tailwind** component system in `components/ui/`
- **Custom hooks** pattern for theme and locale management in `hooks/`

## Critical Development Patterns

### Internationalization Structure

```typescript
// All user-facing text comes from message files
const t = useTranslations('Navigation.nav'); // Access nested keys
t('home'); // Returns localized string
```

- **Message files**: `messages/en.json`, `messages/de.json` with nested structure
- **Route structure**: All pages under `app/[locale]/` for automatic locale routing
- **Middleware**: Handles locale detection/redirection in `middleware.ts`

### Component Conventions

- Use **shadcn/ui pattern**: `components/ui/` for base components with variants via
  `class-variance-authority`
- **Compound components**: Navigation, Footer, FloatingCTA are composed in locale layout
- **Theme-aware**: Components use `useTheme()` hook, not direct theme classes

### Styling Patterns

```typescript
// Standard utility combination pattern
import { cn } from '@/lib/utils'
className={cn("base-classes", variant && "variant-classes", className)}
```

- **Tailwind CSS** with `twMerge` for class deduplication
- **Dark mode** via next-themes with system preference detection
- **Responsive design** with mobile-first approach

## Development Workflows

### Local Development

```bash
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build with type checking disabled
pnpm lint             # ESLint validation
```

### Adding New Content

1. **New pages**: Create under `app/[locale]/new-page/page.tsx`
2. **Translations**: Add keys to both `messages/en.json` and `messages/de.json`
3. **Components**: Follow shadcn/ui pattern in `components/ui/` or custom in `components/`

### Image Management

- **Static assets**: Store in `public/` (e.g., `/logo-color.png`)
- **Optimization**: Images unoptimized via `next.config.mjs` for static export compatibility

## Integration Points

### External Dependencies

- **Vercel Analytics**: Integrated in locale layout for usage tracking
- **v0.app sync**: Automatic deployment sync (don't manually edit core structure)
- **Radix UI**: Headless components with custom styling via Tailwind

### Data Flow

- **Client-side state**: Theme/locale via custom hooks (`use-theme.ts`, `use-locale.ts`)
- **Internationalization**: Server-side message loading in `i18n/request.ts`
- **Navigation state**: Active path detection via `usePathname()`

## Key Files for AI Context

- **`i18n/routing.ts`**: Supported locales and default locale configuration
- **`middleware.ts`**: Route interception for locale handling
- **`messages/*.json`**: All user-facing text (modify both en/de simultaneously)
- **`components/navigation.tsx`**: Complex state management example (mobile menu, active states)
- **`lib/utils.ts`**: Essential utility for className merging (used everywhere)

## Project-Specific Considerations

- **Type safety**: TypeScript enabled but build errors ignored via `next.config.mjs`
- **Static export ready**: Image optimization disabled for deployment flexibility
- **Mobile-first**: All components designed for responsive behavior
- **Accessibility**: Radix UI provides ARIA compliance by default

When modifying this codebase, always consider both English and German translations, maintain the
established component patterns, and preserve the v0.app integration structure.
