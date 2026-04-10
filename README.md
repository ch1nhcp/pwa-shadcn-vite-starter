# React Shadcn Starter

React + Vite + TypeScript template for building apps with shadcn/ui.

## Getting Started

```bash
npx degit hayyi2/react-shadcn-starter my-project
cd my-project
npm install
npm run dev
```

## Getting Done

- [x] Single page app with navigation and responsif layout
- [x] Customable configuration `/config`
- [x] Simple starting page/feature `/pages`
- [x] Github action deploy github pages

## Deploy `gh-pages`

- change `basenameProd` in `/vite.config.ts`
- create deploy key `GITHUB_TOKEN` in github `/settings/keys`
- commit and push changes code
- setup gihub pages to branch `gh-pages`
- run action `Build & Deploy`

### Auto Deploy

- change file `.github/workflows/build-and-deploy.yml`
- Comment on `workflow_dispatch`
- Uncomment on `push`

```yaml
# on:
#   workflow_dispatch:
on:
  push:
    branches: ["main"]
```

## Features

- React + Vite + TypeScript
- Tailwind CSS
- [shadcn-ui](https://github.com/shadcn-ui/ui/)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form validation
- PWA support with service worker and offline detection

## Project Structure

```md
react-shadcn-starter/
├── public/            # Public assets
├── src/               # Application source code
│   ├── components/    # React components
│   ├── contexts/      # React context providers
│   ├── config/        # Config data
│   ├── hooks/         # Custom hooks
│   ├── stores/        # Zustand stores
│   ├── lib/           # Utility functions
│   ├── pages/         # pages/features components
│   ├── App.tsx        # Application entry point
│   ├── index.css      # Main css and tailwind configuration
│   ├── main.tsx       # Main rendering file
│   └── Router.tsx     # Routes component
├── index.html         # HTML entry point
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/hayyi2/react-shadcn-starter/blob/main/LICENSE) file for details.
