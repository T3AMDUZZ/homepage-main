# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DUZZ(더즈) 기업 홈페이지 - B2B 개발 서비스 포트폴리오 사이트. 한국어 콘텐츠, 커스텀 도메인 teamduzz.com으로 GitHub Pages 배포.

## Commands

All commands run from `duzz-homepage/` directory:

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint
```

No test framework configured.

## Tech Stack

- React 19 + React Router DOM 7 (BrowserRouter)
- Vite 7 + Tailwind CSS 4 (@tailwindcss/vite plugin)
- Framer Motion (animations), Lucide React (icons)
- React Hook Form (contact form)
- Google Apps Script backend (contact form email)

## Architecture

```
duzz-homepage/
├── src/
│   ├── App.jsx              # Routes: /, /services, /solutions, /solutions/:slug,
│   │                        #   /process, /contact, /privacy, /terms, *→404
│   ├── components/
│   │   ├── Layout.jsx       # Navbar + Outlet + Footer wrapper
│   │   └── solutions/       # ProjectCard, ProjectFilter
│   ├── pages/               # One file per route
│   ├── data/
│   │   ├── projects.js      # Auto-loads all JSON via import.meta.glob()
│   │   └── projects/*.json  # 20 project data files (8-char ID as filename)
│   └── index.css            # Tailwind config + theme CSS variables
├── public/projects/{ID}/    # thumbnail.svg, 01.svg, 02.svg per project
└── .github/workflows/deploy.yml
```

## Key Data Pattern: Projects

Projects are JSON files in `src/data/projects/`. Adding a new JSON file auto-registers it — no imports needed.

**`src/data/projects.js`** orchestrates loading:
- `import.meta.glob('./projects/*.json', { eager: true })` loads all project JSONs
- Filters out `private: true` projects from public listings
- Sorts: real client projects first, then by year descending
- Helpers: `getProjectBySlug()`, `getProjectsByCategory()`, `getFeaturedProjects()`

**Project JSON fields:** id, slug, title, client ("비공개" = anonymous), category (web/system/app/ecommerce/branding), industry, year, period, role, thumbnail, images[], summary, challenge, description, techStack[], features[], results[{value,label}], highlights[{title,description}], liveUrl, githubUrl, seo{}, private (optional boolean).

**To hide a project:** Add `"private": true` to its JSON — it will be excluded from all listings but still accessible via direct URL.

## Styling

Tailwind CSS 4 with custom theme variables in `src/index.css`:
- Colors: primary (#111111), highlight (#7c3aed purple), secondary (#f7f7f7), accent (#777)
- Fonts: Pretendard Variable (Korean body), Plus Jakarta Sans (headings), JetBrains Mono

Common animation pattern with Framer Motion:
```jsx
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}
```

## Deployment

- Branch `ver3` → GitHub Actions → GitHub Pages (teamduzz.com)
- Workflow at repo root: `.github/workflows/deploy.yml`
- `working-directory: ./duzz-homepage` for build steps
- Env secret: `VITE_CONTACT_API_URL` (Google Apps Script endpoint)

## Environment Variables

```
VITE_CONTACT_API_URL=<Google Apps Script URL>  # used in Contact.jsx
```
