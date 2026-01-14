# AICE Combined Website

This is a combined Next.js project that includes:
- **AICE-Website** (main website) - available at the root route `/`
- **aice-landing-new** (newsletter landing page) - available at `/newsletter`

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the main website.

Visit [http://localhost:3000/newsletter](http://localhost:3000/newsletter) to see the newsletter landing page.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (merged from both projects)
│   ├── page.tsx            # Main website (AICE-Website)
│   ├── newsletter/
│   │   └── page.tsx        # Newsletter landing page
│   └── globals.css         # Merged global styles
├── components/
│   ├── HeroSection.tsx     # From AICE-Website
│   ├── IntroSection.tsx    # From AICE-Website
│   ├── ModulesGrid.tsx     # From AICE-Website
│   ├── CurriculumSection.tsx # From AICE-Website
│   ├── Footer.tsx          # From AICE-Website
│   ├── landing/
│   │   └── gradient-blinds.tsx # From aice-landing-new
│   └── ui/                  # UI components from aice-landing-new
├── hooks/
│   └── use-mobile.tsx      # From aice-landing-new
└── lib/
    ├── clients/
    │   └── firebase.ts     # Firebase configuration
    └── utils/              # Utility functions
```

## Routes

- `/` - Main AICE website (AICE-Website project)
- `/newsletter` - Newsletter subscription landing page (aice-landing-new project)

## Firebase Setup

The newsletter page requires Firebase configuration. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

