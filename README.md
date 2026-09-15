# Afza Noor Portfolio

Personal portfolio website for Afza Noor, built with React, TypeScript, TanStack Start, Vite, Tailwind CSS, and Framer Motion.

## Requirements

- Node.js 20 or newer
- npm

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and provide the contact-form values required for the Resend provider.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Production build

```bash
npm run build
```

## Environment variables

See `.env.example` for the variable names. Never commit `.env` or any API keys, tokens, or other credentials.

## Project structure

- `src/components/` contains the portfolio sections and reusable UI components.
- `src/routes/` contains the TanStack Start routes.
- `src/data/` contains site and portfolio content.
- `public/` contains portfolio images and static assets.