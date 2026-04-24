# Design System Showcase Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the Cohere-inspired design tokens globally to `index.css` and build a `/pages/design-system` route that showcases all 6 component categories in a single-page scroll with sticky section nav.

**Architecture:** CSS tokens land in `index.css` (global, affects all pages). A `useActiveSection` hook drives the sticky nav highlight via `IntersectionObserver`. The page is one file (`DesignSystem.tsx`) composed of 6 inline sections — no sub-components needed since it's a one-off showcase.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Button, Card, Badge, Avatar, Skeleton, Tooltip, Input, Textarea, Label, Separator), react-router-dom v7, Google Fonts (Space Grotesk + Inter)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | Modify | Add Google Fonts import, font vars, remap CSS variables to Cohere palette |
| `src/components/ui/button.tsx` | Modify | Add `hover:text-[#1863dc]` to ghost variant |
| `src/hooks/use-active-section.ts` | Create | `IntersectionObserver`-based hook returning the currently-visible section id |
| `src/pages/DesignSystem.tsx` | Create | Full showcase page — 6 sections, sticky nav |
| `src/Router.tsx` | Modify | Add `/pages/design-system` route |
| `src/config/menu.ts` | Modify | Add "Design System" sub-item under Pages group |

---

## Task 1: Apply Cohere design tokens to `index.css`

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace the full contents of `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500&display=swap');
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

:root {
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui;
  --font-body: 'Inter', Arial, ui-sans-serif, system-ui;
  --font-mono: 'Courier New', ui-monospace, monospace;

  --radius: 1.375rem;
  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #ffffff;
  --secondary: #fafafa;
  --secondary-foreground: #212121;
  --muted: #f2f2f2;
  --muted-foreground: #93939f;
  --accent: #f2f2f2;
  --accent-foreground: #000000;
  --destructive: oklch(0.577 0.245 27.325);
  --border: #d9d9dd;
  --input: #d9d9dd;
  --ring: #9b60aa;
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: #fafafa;
  --sidebar-foreground: #000000;
  --sidebar-primary: #000000;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f2f2f2;
  --sidebar-accent-foreground: #000000;
  --sidebar-border: #d9d9dd;
  --sidebar-ring: #9b60aa;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
  }
}
```

- [ ] **Step 2: Verify TypeScript build passes**

```bash
cd /Users/chinhcp/Desktop/minecrafts/pwa-shadcn-vite-starter && npx tsc --noEmit
```

Expected: no errors (CSS change has no TS impact, just confirming baseline).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: apply Cohere design tokens globally to index.css"
```

---

## Task 2: Ghost button hover color

**Files:**
- Modify: `src/components/ui/button.tsx` line 21

- [ ] **Step 1: Add `hover:text-[#1863dc]` to the ghost variant**

In `src/components/ui/button.tsx`, change line 21 from:
```ts
ghost:
  "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
```
to:
```ts
ghost:
  "hover:bg-accent hover:text-[#1863dc] dark:hover:bg-accent/50",
```

- [ ] **Step 2: Verify TypeScript build passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "feat: ghost button text shifts to Interaction Blue on hover"
```

---

## Task 3: `useActiveSection` hook

**Files:**
- Create: `src/hooks/use-active-section.ts`

- [ ] **Step 1: Create the hook**

```ts
// src/hooks/use-active-section.ts
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-10% 0px -75% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return activeId
}
```

- [ ] **Step 2: Verify TypeScript build passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-active-section.ts
git commit -m "feat: add useActiveSection hook for sticky nav highlight"
```

---

## Task 4: Build the DesignSystem page

**Files:**
- Create: `src/pages/DesignSystem.tsx`

- [ ] **Step 1: Create the page component**

```tsx
// src/pages/DesignSystem.tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { useActiveSection } from '@/hooks/use-active-section'

const SECTIONS = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'forms', label: 'Forms' },
  { id: 'feedback', label: 'Feedback' },
]

const PALETTE = [
  { name: 'Cohere Black', hex: '#000000', bg: 'bg-black' },
  { name: 'Near Black', hex: '#212121', bg: 'bg-[#212121]' },
  { name: 'Interaction Blue', hex: '#1863dc', bg: 'bg-[#1863dc]' },
  { name: 'Focus Purple', hex: '#9b60aa', bg: 'bg-[#9b60aa]' },
  { name: 'Muted Slate', hex: '#93939f', bg: 'bg-[#93939f]' },
  { name: 'Border Cool', hex: '#d9d9dd', bg: 'bg-[#d9d9dd]' },
  { name: 'Lightest Gray', hex: '#f2f2f2', bg: 'bg-[#f2f2f2]' },
  { name: 'Snow', hex: '#fafafa', bg: 'bg-[#fafafa]' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-widest uppercase text-muted-foreground font-mono mb-2">
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-6 font-light tracking-tight text-foreground"
      style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', letterSpacing: '-0.04rem' }}
    >
      {children}
    </h2>
  )
}

export default function DesignSystem() {
  const activeId = useActiveSection(SECTIONS.map((s) => s.id))

  return (
    <TooltipProvider>
      <PageHeader>
        <PageHeaderHeading
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '-0.96px',
            lineHeight: 1,
          }}
        >
          Design System
        </PageHeaderHeading>
        <p className="text-sm text-muted-foreground mt-2">
          Cohere-inspired components · Space Grotesk · Inter · 22px card radius
        </p>
      </PageHeader>

      <div className="flex gap-8">
        {/* Sticky section nav */}
        <aside className="hidden lg:block w-40 flex-shrink-0">
          <div className="sticky top-4">
            <p className="text-xs tracking-widest uppercase text-muted-foreground font-mono mb-3">
              On this page
            </p>
            <nav className="flex flex-col gap-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-sm py-1 transition-colors hover:text-[#1863dc] ${
                    activeId === s.id
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Page content */}
        <div className="flex-1 min-w-0 space-y-12 pb-16">

          {/* 01 — Colors */}
          <section id="colors">
            <SectionLabel>01 — Colors</SectionLabel>
            <SectionTitle>Palette</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {PALETTE.map((swatch) => (
                <div key={swatch.hex} className="w-20">
                  <div
                    className={`h-10 rounded-xl border border-border ${swatch.bg}`}
                  />
                  <p className="text-xs font-medium mt-1.5 text-foreground">{swatch.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{swatch.hex}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* 02 — Typography */}
          <section id="typography">
            <SectionLabel>02 — Typography</SectionLabel>
            <SectionTitle>Type Scale</SectionTitle>
            <div className="space-y-5">
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Display / 72px
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.09rem',
                    lineHeight: 1,
                  }}
                >
                  Enterprise AI
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Sub-heading / 32px
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 400,
                    letterSpacing: '-0.032rem',
                  }}
                >
                  Feature Title
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Body Large / 18px
                </span>
                <span className="text-lg">
                  Intro paragraph text for sections and descriptions.
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Caption / 14px
                </span>
                <span className="text-sm text-muted-foreground">
                  Metadata, descriptions, and helper text
                </span>
              </div>
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">
                  Uppercase Label
                </span>
                <span className="text-xs tracking-widest uppercase font-mono text-muted-foreground">
                  Section Label · CohereMono style
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* 03 — Buttons */}
          <section id="buttons">
            <SectionLabel>03 — Buttons</SectionLabel>
            <SectionTitle>Variants & Sizes</SectionTitle>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Variants</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="default">Dark Solid</Button>
                  <Button variant="outline">Outlined</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Ghost is transparent by default · text shifts to{' '}
                <code className="font-mono">#1863dc</code> on hover
              </p>
            </div>
          </section>

          <Separator />

          {/* 04 — Cards & Containers */}
          <section id="cards">
            <SectionLabel>04 — Cards & Containers</SectionLabel>
            <SectionTitle>22px Radius System</SectionTitle>
            <div className="flex flex-wrap gap-4 mb-6">
              <Card className="w-52 rounded-[22px]">
                <CardHeader>
                  <CardTitle className="text-base">Standard Card</CardTitle>
                  <CardDescription>1px solid border · 22px radius</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Default border-border surface</p>
                </CardContent>
              </Card>
              <Card className="w-52 rounded-[22px] border-[#d9d9dd]">
                <CardHeader>
                  <CardTitle className="text-base">Emphasized</CardTitle>
                  <CardDescription>Border Cool (#d9d9dd)</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Higher-contrast containment</p>
                </CardContent>
              </Card>
            </div>
            {/* Purple Band */}
            <div className="rounded-[22px] bg-gradient-to-br from-[#2d1b6e] to-[#1a0f4a] p-8 text-white">
              <p className="text-xs tracking-widest uppercase font-mono text-white/50 mb-3">
                Purple Band
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 300,
                  letterSpacing: '-0.035rem',
                }}
              >
                Enterprise AI Platform
              </p>
              <p className="text-sm text-white/60 mt-2">
                Full-width deep purple sections create dramatic visual breaks in the white page flow.
              </p>
            </div>
          </section>

          <Separator />

          {/* 05 — Forms */}
          <section id="forms">
            <SectionLabel>05 — Forms</SectionLabel>
            <SectionTitle>Inputs & Controls</SectionTitle>
            <div className="max-w-sm space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ds-email">Email address</Label>
                <Input id="ds-email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ds-message">Message</Label>
                <Textarea id="ds-message" placeholder="Your message..." rows={3} />
              </div>
              <p className="text-xs text-muted-foreground">
                Focus border:{' '}
                <code className="font-mono">#9b60aa</code> (Focus Purple) · Border:{' '}
                <code className="font-mono">#d9d9dd</code>
              </p>
            </div>
          </section>

          <Separator />

          {/* 06 — Feedback & Overlays */}
          <section id="feedback">
            <SectionLabel>06 — Feedback & Overlays</SectionLabel>
            <SectionTitle>Badges, Avatars, Skeletons, Tooltips</SectionTitle>
            <div className="space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Badges</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Avatars</p>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>YZ</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Skeletons</p>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Tooltip</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltip using Focus Purple ring</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

        </div>
      </div>
    </TooltipProvider>
  )
}
```

- [ ] **Step 2: Verify TypeScript build passes**

```bash
npx tsc --noEmit
```

Expected: no errors. Fix any import path issues if they arise.

- [ ] **Step 3: Commit**

```bash
git add src/pages/DesignSystem.tsx
git commit -m "feat: add DesignSystem showcase page"
```

---

## Task 5: Wire up routing and sidebar menu

**Files:**
- Modify: `src/Router.tsx`
- Modify: `src/config/menu.ts`

- [ ] **Step 1: Add the route to `src/Router.tsx`**

Add import at the top (with other page imports):
```tsx
import DesignSystem from './pages/DesignSystem'
```

Add route inside `<Route element={<AppLayout />}>`, after the `pwa` route:
```tsx
<Route path="pages/design-system" element={<DesignSystem />} />
```

Full updated Routes block:
```tsx
<Routes>
  <Route element={<AppLayout />}>
    <Route path="" element={<Dashboard />} />
    <Route path="pages">
      <Route path="sample" element={<Sample />} />
      <Route path="contact" element={<ContactForm />} />
      <Route path="feature" element={<ComingSoon />} />
      <Route path="pwa" element={<PWAStatus />} />
    </Route>
    <Route path="pages/design-system" element={<DesignSystem />} />
    <Route path="*" element={<NotMatch />} />
  </Route>
</Routes>
```

- [ ] **Step 2: Add "Design System" to the sidebar menu in `src/config/menu.ts`**

Add to the `Pages` group's `items` array (after `Coming Soon`):
```ts
{
  title: 'Design System',
  url: '/pages/design-system',
},
```

Full updated `mainMenu`:
```ts
export const mainMenu: MenuType = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Gauge
  },
  {
    title: 'Pages',
    url: '/pages',
    icon: Files,
    items: [
      { title: 'Sample Page', url: '/pages/sample' },
      { title: 'Contact Form', url: '/pages/contact' },
      { title: 'Coming Soon', url: '/pages/feature' },
      { title: 'Design System', url: '/pages/design-system' },
    ]
  },
  {
    title: 'PWA Status',
    url: '/pages/pwa',
    icon: Smartphone,
  },
  {
    title: 'Error',
    url: '/404',
    icon: CircleAlert,
  },
]
```

- [ ] **Step 3: Verify TypeScript build passes**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/Router.tsx src/config/menu.ts
git commit -m "feat: add /pages/design-system route and sidebar menu entry"
```

---

## Task 6: Verify in browser

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open http://localhost:5173/pages/design-system**

Verify:
- Sidebar shows "Design System" under Pages group
- Page loads with Space Grotesk heading "Design System"
- All 6 sections visible on scroll
- Sticky nav on left highlights active section as you scroll
- Buttons: ghost is transparent, dark solid is black, outlined has border
- Ghost button text turns blue on hover
- Cards have 22px radius
- Purple band renders as dark-purple gradient
- Input/textarea focus shows purple ring (#9b60aa)
- Badges, avatars, skeletons, tooltip all render

- [ ] **Step 3: Check other pages haven't broken**

- Navigate to Dashboard — confirm layout still works
- Navigate to Contact Form — confirm form fields render with updated token colors
- Toggle dark mode — confirm dark mode still switches correctly

- [ ] **Step 4: Final commit (if any last tweaks made)**

```bash
git add -p   # stage only intentional changes
git commit -m "fix: visual tweaks from browser verification"
```
