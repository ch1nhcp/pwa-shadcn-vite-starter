# PWA Shadcn Vite Starter

A production-ready React starter template with PWA support, shadcn/ui components, and a full state/form management stack.

## Getting Started

```bash
npx degit ch1nhcp/pwa-shadcn-vite-starter my-project
cd my-project
npm install
npm run dev
```

## Features

- **React 19** + **Vite 6** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** — accessible, composable component library
- **[react-router-dom v7](https://reactrouter.com/)** — client-side routing
- **[Zustand v5](https://github.com/pmndrs/zustand)** — lightweight async state management
- **[React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)** — type-safe form validation
- **PWA support** via `vite-plugin-pwa` — service worker, offline detection, install prompt, update prompt
- **Dark/light mode** via ThemeContext
- Responsive sidebar layout with mobile support

## Project Structure

```
pwa-shadcn-vite-starter/
├── public/                   # Static assets and PWA icons
├── src/
│   ├── components/           # Shared UI components
│   │   ├── ui/               # shadcn/ui primitives
│   │   ├── pwa-install-prompt.tsx
│   │   ├── pwa-offline-indicator.tsx
│   │   └── pwa-update-prompt.tsx
│   ├── contexts/             # React context providers (ThemeContext)
│   ├── config/               # App and menu configuration
│   ├── hooks/                # Custom hooks (PWA, mobile, online status)
│   ├── stores/               # Zustand stores
│   ├── lib/                  # Utility functions
│   ├── pages/                # Route-level page components
│   ├── App.tsx               # Root app component
│   ├── Router.tsx            # Route definitions
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles and Tailwind config
├── index.html
├── tsconfig.json
└── vite.config.ts
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run build:gh` | Build for GitHub Pages deployment |
| `npm run lint` | Run ESLint |

## Deploy to GitHub Pages

1. Set `VITE_BASE_URL` in `vite.config.ts` to your repo path (e.g. `/pwa-shadcn-vite-starter/`)
2. Add a `GITHUB_TOKEN` deploy key in your repo settings
3. Push changes — the `Build & Deploy` action will run

### Enable Auto Deploy on Push

In `.github/workflows/build-and-deploy.yml`, swap the trigger:

```yaml
on:
  push:
    branches: ["main"]
# on:
#   workflow_dispatch:
```

## License

MIT
