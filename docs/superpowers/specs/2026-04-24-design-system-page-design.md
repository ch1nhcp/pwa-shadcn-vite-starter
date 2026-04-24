# Design System Showcase Page

**Date:** 2026-04-24
**Status:** Approved

## Summary

Add a `/pages/design-system` route that showcases all shadcn/ui components styled with the Cohere-inspired design system defined in `DESIGN.md`. Simultaneously update `index.css` to apply Cohere design tokens globally — making the design system real and app-wide, not isolated to the showcase page.

---

## 1. CSS Token Update (`src/index.css`)

**Scope:** Global — affects all pages.

### Font imports
Add Google Fonts import at the top of `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500&display=swap');
```

### Font stack custom properties (add to `:root`)
```css
--font-display: 'Space Grotesk', ui-sans-serif, system-ui;
--font-body: 'Inter', Arial, ui-sans-serif, system-ui;
--font-mono: 'Courier New', ui-monospace, monospace;
```

Apply to `@layer base`:
```css
body { font-family: var(--font-body); }
```

### CSS variable remapping (`:root`)

| Variable | Current | New (Cohere) | Notes |
|----------|---------|--------------|-------|
| `--radius` | `0.625rem` (10px) | `1.375rem` (22px) | Signature Cohere radius |
| `--background` | white | `#ffffff` | Pure White (no change) |
| `--foreground` | near-black | `#000000` | Cohere Black |
| `--card` | white | `#ffffff` | Pure White |
| `--card-foreground` | near-black | `#000000` | |
| `--primary` | dark | `#000000` | Cohere Black |
| `--primary-foreground` | white | `#ffffff` | |
| `--secondary` | light gray | `#fafafa` | Snow |
| `--secondary-foreground` | dark | `#212121` | Near Black |
| `--muted` | light gray | `#f2f2f2` | Lightest Gray |
| `--muted-foreground` | mid gray | `#93939f` | Muted Slate |
| `--accent` | light gray | `#f2f2f2` | Lightest Gray |
| `--accent-foreground` | dark | `#000000` | |
| `--border` | light gray | `#d9d9dd` | Border Cool |
| `--input` | light gray | `#d9d9dd` | Border Cool |
| `--ring` | mid gray | `#9b60aa` | Focus Purple — used as focus ring on all inputs and focus-visible elements |
| `--destructive` | red | unchanged | Keep existing |

Dark mode variables stay as-is (Cohere is primarily a light-mode design system).

---

## 2. New Page (`src/pages/DesignSystem.tsx`)

### Route
`/pages/design-system`

### Layout
Single-page vertical scroll. Two-column inside main content area:
- **Left column (sticky, 160px):** "On this page" section navigator with 6 links. Highlights active section on scroll using `IntersectionObserver`.
- **Right column (flex-1):** Six sequential sections separated by a `<Separator />`.

### Page header
```
Display: "Design System"           ← Space Grotesk, 48px, weight 300, letter-spacing -0.96px
Subtitle: "Cohere-inspired …"      ← Inter, 14px, Muted Slate (#93939f)
```

### Sections

**01 — Colors**
- Section label: uppercase CohereMono-style label (`text-xs tracking-widest uppercase text-muted-foreground font-mono`)
- 8 color swatches in a flex row: Cohere Black, Near Black, Interaction Blue, Focus Purple, Muted Slate, Border Cool, Lightest Gray, Snow
- Each swatch: colored block (h-10, rounded-xl) + name + hex value below

**02 — Typography**
- 5 type-scale rows, each showing: `<meta label>` + live text sample
  - Display / 72px: Space Grotesk 72px weight-300 tracking-tight — sample "Enterprise AI"
  - Sub-heading / 32px: Space Grotesk 32px weight-400
  - Body Large / 18px: Inter 18px
  - Caption / 14px: Inter 14px, Muted Slate
  - Uppercase Label / 14px: monospace uppercase tracking-widest, Muted Slate

**03 — Buttons**
- Three rows: variants, sizes, states
- Variants: Ghost (`variant="ghost"`), Dark Solid (`variant="default"`), Outlined (`variant="outline"`)
- Sizes: `size="sm"`, `size="default"`, `size="lg"`
- Note: ghost button text shifts to `#1863dc` on hover — implemented by adding `hover:text-[#1863dc]` to the ghost variant class string in `src/components/ui/button.tsx`. This is surgical and doesn't affect other accent usages.

**04 — Cards & Containers**
- Three card examples in a flex row:
  - Standard: `rounded-[22px] border border-border bg-card` with title + description
  - Emphasized: same but `border-[#d9d9dd]`
  - Purple Band: full-width section below the cards — `bg-gradient-to-br from-[#2d1b6e] to-[#1a0f4a] text-white rounded-[22px] p-8`

**05 — Forms**
- Uses `<Label>`, `<Input>`, `<Textarea>` from shadcn/ui
- Two fields: "Email address" + "Message"
- Focus state: Focus Purple (`#9b60aa`) — applied by setting `--ring` or overriding `--input` focus border in `index.css`
- Note below: "Focus border: #9b60aa · 8px radius on inputs"

**06 — Feedback & Overlays**
- `<Badge>` in default, outline, and secondary variants
- `<Avatar>` with initials fallback
- `<Skeleton>` — two rows (simulating loading text)
- `<Tooltip>` wrapping a button — hover to reveal

---

## 3. Routing & Navigation

### `src/Router.tsx`
Add import and route:
```tsx
import DesignSystem from './pages/DesignSystem'
// inside <Route element={<AppLayout />}>:
<Route path="pages/design-system" element={<DesignSystem />} />
```

### `src/config/menu.ts`
Add under the Pages group items array:
```ts
{ title: 'Design System', url: '/pages/design-system' }
```

### `src/config/menu.ts` — placement
"Design System" is a sub-item under the existing Pages group — no separate top-level entry. No additional icon needed since sub-items don't show icons in the current sidebar implementation.

---

## 4. Sticky Section Nav — Active State

Use `IntersectionObserver` inside a `useActiveSection` hook:
- Observe each section `<div id="colors">`, `<div id="typography">` etc.
- Update state with whichever section's top crosses the 20% viewport threshold
- Nav items highlight with `font-medium text-foreground` when active, otherwise `text-muted-foreground`

---

## 5. Files Changed / Created

| File | Change |
|------|--------|
| `src/index.css` | Add Google Fonts import, font custom properties, remap CSS variables |
| `src/pages/DesignSystem.tsx` | New page component |
| `src/Router.tsx` | Add `/pages/design-system` route |
| `src/config/menu.ts` | Add "Design System" menu entry |

No new shadcn/ui components needed — all components used (`Badge`, `Avatar`, `Skeleton`, `Tooltip`, `Input`, `Textarea`, `Label`, `Button`, `Card`, `Separator`) are already installed.

---

## 6. Out of Scope

- Dark mode design system tokens (dark mode stays as shadcn defaults)
- Interactive playground (e.g. editable component props)
- Popover / Sheet / Dropdown-menu interactive demos (could be added later)
- Mobile sticky nav (collapses to a select on mobile — stretch goal)
