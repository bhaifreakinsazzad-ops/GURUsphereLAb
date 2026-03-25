

# GURU'sphere Lab — Pre-Publish Optimization Plan

## Issues Found

### Critical
1. **App.css is breaking layout** — The leftover Vite boilerplate `#root { max-width: 1280px; margin: 0 auto; padding: 2rem; }` constrains the full-width layout, adds unwanted padding, and centers content incorrectly. This file must be emptied.

2. **Hero background image may not load** — `hero-tree.jpg` was created as an asset but if it's a placeholder/broken file, the hero will look empty. Need to verify and add a CSS fallback gradient.

3. **No `<meta>` viewport or favicon issues** — The OG image URL points to a Lovable CDN preview screenshot, not a designed social card. This hurts social sharing conversions.

### UX / Conversion Issues
4. **Footer email form does nothing** — The "Join GURU'sphere Lab" button and email input have no handler. At minimum, add a toast confirmation so users feel acknowledged.

5. **Navbar CTA says "Join Free" but links to `#join`** — The footer section has no clear value proposition before the email input. Needs a stronger hook.

6. **Exam Arena has only 3 sample questions** — After picking any of 8 categories, users get the same 3 generic questions. This feels broken and kills trust instantly.

7. **No smooth scroll behavior** — Anchor links (`#classroom`, `#library`, etc.) jump harshly. Adding `scroll-behavior: smooth` to HTML is a one-line fix.

8. **404 page is generic** — Doesn't match the brand at all.

### Performance
9. **20 floating particles in Hero** — Each creates a separate `motion.div` with infinite animation. On low-end Bangladeshi mobile devices, this causes jank. Reduce to 8-10.

10. **No lazy loading on sub-pages** — ExamArena (620 lines) and HadiMeter (531 lines) are eagerly loaded even when user only visits the homepage.

---

## Plan

### Step 1: Remove App.css boilerplate
- Empty `src/App.css` or delete its import from `main.tsx`. This is the highest-impact fix — currently the `#root` max-width and padding are constraining the entire layout.

### Step 2: Add smooth scrolling + global UX polish
- Add `scroll-behavior: smooth` to `html` in `index.css`.
- Reduce hero particles from 20 to 10.
- Add `loading="lazy"` concept for the hero background image.

### Step 3: Make the footer form functional
- Add `useState` for email input, basic email validation, and a toast notification on submit ("ধন্যবাদ! আপনাকে শীঘ্রই জানানো হবে।").
- Prevent empty/invalid submissions.

### Step 4: Lazy-load route pages
- Use `React.lazy()` + `Suspense` for `/exam-arena` and `/hadi-meter` routes in `App.tsx` to reduce initial bundle size.

### Step 5: Brand-match the 404 page
- Restyle NotFound to use the GURU'sphere brand colors, gradient background, and Bengali text. Add a clear "Go Home" button.

### Step 6: Fix Exam Arena question variety
- Add 2-3 more questions per displayed category (at least 6-8 total sample questions across different subjects) so users don't see the same 3 questions regardless of category.

### Step 7: SEO + social sharing final pass
- Update `og:description` and `twitter:description` for better click-through.
- Ensure the page title renders correctly with the apostrophe in "GURU'sphere".

---

## Technical Details

**Files modified:**
- `src/App.css` — empty it
- `src/index.css` — add `scroll-behavior: smooth` on `html`
- `src/components/HeroSection.tsx` — reduce particles to 10
- `src/components/FooterSection.tsx` — add form state + toast
- `src/App.tsx` — lazy-load routes
- `src/pages/NotFound.tsx` — rebrand
- `src/pages/ExamArena.tsx` — expand sample questions

**No backend needed** — all changes are frontend-only.

