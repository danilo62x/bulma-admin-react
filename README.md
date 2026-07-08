# Bulma Admin / React

[Leia em português](./README.pt-BR.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Bulma Admin / React is the React version of the Bulma admin layout: the same visual identity and the same 25 pages as the Vue 3 + Buefy template, implemented with React 19, hooks, Vite 6 and strict TypeScript. State lives in Zustand stores, routing in React Router 7, and authentication is mocked so the whole app runs without a backend. It also includes a light and dark theme, three languages and a PWA setup.

Live preview: https://template.dev.br/preview/bulma-admin-react/

## Pages included

25 route pages in `src/pages/`:

- Landing: public marketing page with hero, feature and pricing sections
- Login: sign-in form with validation and mock credentials
- Register: account creation form
- ForgotPassword: request form for a reset link
- ResetPassword: form to set a new password
- Dashboard: KPI stat cards with sparklines, charts and recent activity
- Charts: analytics page with bar, area and donut charts (ApexCharts)
- Forms: inputs, selects, date picker, file upload and inline validation (Formik + Yup)
- Tables: data table with sorting, filtering, pagination and row selection (TanStack Table)
- Components: catalog of the base UI components
- UiAdvanced: modals, tabs, toasts and other composite widgets
- Typography: type scale, headings and text helpers
- Integrations: third-party service cards with toggles
- Profile: user page with personal data and activity
- Pricing: plan comparison
- Settings: application preferences, theme and language
- Inbox: mail-style app screen with folders and message list
- FileManager: file listing with folders and file actions
- Gallery: image grid
- Invoice: printable invoice detail
- Billing: payment methods and invoice history
- Documentation: in-app reference page for the template
- Maintenance: standalone downtime page
- ComingSoon: standalone pre-launch page
- NotFound: 404 error page

## Tech stack

- React 19 with react-dom 19 and TypeScript 5.7 (strict)
- Bulma 1.0.4
- Vite 6 with `vite-plugin-pwa` 1.3 (installable PWA, offline cache)
- React Router 7.1 (react-router-dom)
- Zustand 5.0 for state (auth, menu, ui stores)
- i18next 26 + react-i18next 17 + browser language detector (en, es, pt-BR)
- ApexCharts 5 via react-apexcharts 2.1
- TanStack React Table 8.21
- Slate 0.124 rich text editor (slate-react, slate-history)
- Formik 2.4 + Yup 1.7 form validation
- Material Design Icons (@mdi/font 7.4)
- Sass 1.83

## Requirements

- Node.js 18 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Vite starts a dev server with hot reload. Authentication is simulated in the Zustand auth store, no backend needed. Demo credentials:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build for production

```bash
npm run build
```

Runs `tsc --noEmit` type checking and outputs the production bundle to `dist/`. Preview the build locally with `npm run preview`.

## Project structure

```
src/
├── assets/styles/     app.scss, variables.css, dark.css, landing.scss
├── components/
│   ├── landing/       sections of the public landing page
│   ├── layout/        header, sidebar, footer
│   └── ui/            shared UI components
├── hooks/             shared React hooks
├── i18n/locales/      en.json, es.json, pt-BR.json
├── pages/             25 route pages
└── stores/            auth.ts, menu.ts, ui.ts (Zustand)
```

## Theming and customization

Bulma Sass variables are set at the top of `src/assets/styles/app.scss`, before `@use 'bulma/bulma'`: `$primary` (#485fc7), `$family-sans-serif` (Inter) and `$radius`. Runtime tokens are CSS custom properties with the `--tx-` prefix in `variables.css`: semantic colors, sidebar and header dimensions, and a spacing scale. `dark.css` overrides those tokens for the dark theme, which the UI store toggles at runtime. Change `--tx-primary` and `$primary` together to rebrand the template.

## Internationalization

Three locales ship in `src/i18n/locales/`: English, Spanish and Brazilian Portuguese. i18next detects the browser language on first load and the header switcher persists the user's choice.

## The same layout in other stacks

This repo is one of five implementations of the same Bulma admin layout. Each one has the same 25 views and the same visual identity:

- Vue 3 + Buefy: https://github.com/danilo62x/bulma-admin-buefy
- Angular 19: https://github.com/danilo62x/bulma-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/bulma-admin-laravel
- Static HTML: https://github.com/danilo62x/bulma-admin-html

The full catalog of free and paid templates is at https://template.dev.br

## Support this project

This template is free and MIT licensed. If it saves you time, you can support the work with a donation at https://template.dev.br/doar?template=bulma-admin-react

## License

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
