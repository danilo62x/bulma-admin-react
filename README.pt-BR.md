# Bulma Admin / React

[Read in English](./README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Bulma Admin / React é a versão React do layout admin em Bulma: a mesma identidade visual e as mesmas 25 páginas do template Vue 3 + Buefy, implementadas com React 19, hooks, Vite 6 e TypeScript estrito. O estado fica em stores Zustand, as rotas no React Router 7, e a autenticação é simulada, então o app inteiro roda sem backend. Também inclui tema claro e escuro, três idiomas e configuração de PWA.

Preview ao vivo: https://template.dev.br/preview/bulma-admin-react/

## Páginas incluídas

25 páginas de rota em `src/pages/`:

- Landing: página pública de marketing com hero, seções de recursos e preços
- Login: formulário de acesso com validação e credenciais de demonstração
- Register: formulário de criação de conta
- ForgotPassword: solicitação de link de redefinição de senha
- ResetPassword: definição de nova senha
- Dashboard: cards de KPI com sparklines, gráficos e atividade recente
- Charts: página de analytics com gráficos de barra, área e rosca (ApexCharts)
- Forms: inputs, selects, date picker, upload de arquivos e validação inline (Formik + Yup)
- Tables: tabela de dados com ordenação, filtros, paginação e seleção de linhas (TanStack Table)
- Components: catálogo dos componentes base de UI
- UiAdvanced: modais, abas, toasts e outros widgets compostos
- Typography: escala tipográfica, títulos e utilitários de texto
- Integrations: cards de serviços de terceiros com toggles
- Profile: página do usuário com dados pessoais e atividade
- Pricing: comparação de planos
- Settings: preferências da aplicação, tema e idioma
- Inbox: tela estilo cliente de e-mail com pastas e lista de mensagens
- FileManager: listagem de arquivos com pastas e ações
- Gallery: grade de imagens
- Invoice: detalhe de fatura pronto para impressão
- Billing: formas de pagamento e histórico de faturas
- Documentation: página de referência do template dentro do app
- Maintenance: página avulsa de manutenção
- ComingSoon: página avulsa de pré-lançamento
- NotFound: página de erro 404

## Stack

- React 19 com react-dom 19 e TypeScript 5.7 (estrito)
- Bulma 1.0.4
- Vite 6 com `vite-plugin-pwa` 1.3 (PWA instalável, cache offline)
- React Router 7.1 (react-router-dom)
- Zustand 5.0 para estado (stores auth, menu, ui)
- i18next 26 + react-i18next 17 + detector de idioma do navegador (en, es, pt-BR)
- ApexCharts 5 via react-apexcharts 2.1
- TanStack React Table 8.21
- Editor de texto rico Slate 0.124 (slate-react, slate-history)
- Validação de formulários com Formik 2.4 + Yup 1.7
- Material Design Icons (@mdi/font 7.4)
- Sass 1.83

## Requisitos

- Node.js 18 ou mais novo
- npm

## Como rodar

```bash
npm install
npm run dev
```

O Vite sobe um servidor de desenvolvimento com hot reload. A autenticação é simulada na store de auth do Zustand, sem backend. Credenciais de demonstração:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build de produção

```bash
npm run build
```

Roda a checagem de tipos com `tsc --noEmit` e gera o bundle de produção em `dist/`. Para inspecionar o build localmente use `npm run preview`.

## Estrutura do projeto

```
src/
├── assets/styles/     app.scss, variables.css, dark.css, landing.scss
├── components/
│   ├── landing/       seções da landing page pública
│   ├── layout/        header, sidebar, footer
│   └── ui/            componentes de UI compartilhados
├── hooks/             hooks React compartilhados
├── i18n/locales/      en.json, es.json, pt-BR.json
├── pages/             25 páginas de rota
└── stores/            auth.ts, menu.ts, ui.ts (Zustand)
```

## Tema e customização

As variáveis Sass do Bulma ficam no topo de `src/assets/styles/app.scss`, antes do `@use 'bulma/bulma'`: `$primary` (#485fc7), `$family-sans-serif` (Inter) e `$radius`. Os tokens de runtime são custom properties CSS com prefixo `--tx-` em `variables.css`: cores semânticas, dimensões de sidebar e header e uma escala de espaçamento. O `dark.css` sobrescreve esses tokens para o tema escuro, que a store de UI alterna em tempo de execução. Para trocar a marca, ajuste `--tx-primary` e `$primary` juntos.

## Internacionalização

Três locales em `src/i18n/locales/`: inglês, espanhol e português do Brasil. O i18next detecta o idioma do navegador no primeiro acesso e o seletor no header persiste a escolha do usuário.

## O mesmo layout em outras stacks

Este repositório é uma das cinco implementações do mesmo layout admin em Bulma. Todas têm as mesmas 25 views e a mesma identidade visual:

- Vue 3 + Buefy: https://github.com/danilo62x/bulma-admin-buefy
- Angular 19: https://github.com/danilo62x/bulma-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/bulma-admin-laravel
- HTML estático: https://github.com/danilo62x/bulma-admin-html

O catálogo completo de templates gratuitos e pagos está em https://template.dev.br

## Apoie o projeto

Este template é gratuito e licenciado sob MIT. Se ele economizou seu tempo, você pode apoiar o trabalho com uma doação em https://template.dev.br/doar?template=bulma-admin-react

## Licença

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
