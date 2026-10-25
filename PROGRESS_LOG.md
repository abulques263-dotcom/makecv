# Calcora Project Progress Log

## 2026-10-19

### Verified starting state
- Repository: https://github.com/abulques263-dotcom/makecv (public; default branch `main`).
- Reviewed the existing `index.html`, `styles.css`, `app.js`, `README.md`, and `PROGRESS_LOG.md`.
- The existing live-code candidate is a single marks/percentage calculator with add/remove subject rows, target percentage estimate, reset, and print/save-as-PDF.
- The requested Phase 1 calculators, separate pages, SEO pages, and supporting calculators are **not yet implemented in the reviewed source**. They must not be marked complete until built and tested.
- Existing code files were backed up before changes under `backups/2026-10-19/`:
  - `index.html`
  - `styles.css`
  - `app.js`
  - `README.md`
  - `PROGRESS_LOG.md`
- Backup files are committed to the `main` branch.

### Brand decision
- Final brand selected by user: **Calcora**.
- Proposed tagline: **Smart Calculations. Simple Solutions.**
- Audience: global.
- Language: English.
- CGPA converter requirement: selectable conversion scale, with formulas disclosed and no claim that one formula works for every institution.

### Work completed in this step
- Updated the homepage title, description, brand text, accessible home label, and footer tagline from SmartEarn to Calcora.
- Updated README branding.
- This step is branding only; no new calculators or SEO pages were added yet.
- Live deployment was not independently re-verified during this update.

### Next steps
1. Verify the branding update and GitHub Pages deployment.
2. Build Phase 1 tools: Percentage, CGPA Converter with selectable scale, Required Marks, Average Marks, and Grade Calculator.
3. Add crawlable pages with unique titles/descriptions and useful English content.
4. Test calculations, empty/invalid/boundary inputs, and responsive layouts.
5. Add remaining tools, About, Contact, and Privacy Policy after Phase 1 verification.
6. Check Google Search Console/indexing and possible monetization later. Search ranking and income are not guaranteed.

### Phase 1 implementation started — 2026-10-19
- Added shared `tools.css` styles for standalone calculator pages.
- Added `tools.js` client-side calculation handlers for selectable CGPA conversion, required marks, average marks, and grade estimation.
- Added individual pages:
  - `cgpa-to-percentage.html`
  - `required-marks.html`
  - `average-marks.html`
  - `grade-calculator.html`
- Updated homepage to link to Phase 1 tools and added a canonical URL.
- Each new page includes a unique title, meta description, canonical URL, instructions, formula caveat, FAQs, and links to related calculators.
- Grade boundaries and CGPA formulas are labelled as examples; users are told to check official institutional rules.
- Verification so far: GitHub file contents were fetched successfully after writes. Automated browser testing and live GitHub Pages deployment status are not yet verified.
- Still to do: thoroughly test calculations and accessibility, finish unique metadata for the homepage, add the remaining supporting pages/tools, generate/verify sitemap and robots.txt, and check Search Console/indexing.

### Premium interface pass — 2026-10-24
- Added a consistent premium visual layer across the homepage and standalone calculator pages: softer blue-tinted background, clearer card hierarchy, refined spacing, rounder form controls, focus rings, and subtle hover states.
- Moved each standalone calculator page's FAQ section after the related-calculators section so FAQ sits immediately before the footer.
- Added a homepage FAQ section at the bottom of the main content, immediately before the footer.
- No calculator JavaScript was changed in this visual pass.
- Live Pages deployment and visual browser testing are not claimed as verified.

### Calculator QA pass — 2026-10-24
- Reviewed the current client-side handlers in `app.js` and `tools.js` for the percentage, CGPA, required-marks, average, and grade calculators.
- Manually checked representative formula examples against the formulas used in the source: 45/60 = 75%; 8.2 × 9.5 = 77.9%; 3.2/4 = 80%; required marks for 80% on 300 completed + 100 remaining with 240 already scored = 80; average of 70, 80, 90 = 80; 42/50 = 84%.
- Source inspection confirms validation paths for empty/invalid inputs, CGPA range by selected scale, marks above maximum, negative scores, target range, and required marks exceeding remaining available marks.
- These were source-review and manual formula sanity checks, not automated browser tests. Cross-browser interaction, actual live-page behavior, and deployment remain unverified.

### Remaining calculators added — 2026-10-24
- Added standalone pages for Age Calculator, Date Calculator, Discount Calculator, Simple Interest Calculator, and Exam Countdown.
- Added client-side calculation handlers with validation to `tools.js`.
- Added links to the new calculators on the homepage and shared related-calculator lists.
- Each new page includes a unique title, meta description, canonical URL, accessible labels, formula/instructions, and FAQ at the bottom immediately before the footer.
- Formula sanity checks: discount $80 at 25% => $60 final/$20 saved; simple interest $1,000 at 5% for 3 years => $150 interest/$1,150 total; date difference uses UTC calendar midnights; age uses calendar-year/month/day arithmetic; countdown compares calendar dates.
- Source files are committed and will be re-fetched to verify. Browser testing and live deployment are not claimed as verified.

- Follow-up source validation found and corrected a JavaScript branch-boundary syntax issue in the new tool handlers before calling the implementation complete.


### Technical SEO foundation — 2026-10-24
- Added `sitemap.xml` listing the homepage and the nine calculator pages currently in the project.
- Added `robots.txt` allowing public crawling and pointing crawlers to the sitemap URL.
- This improves crawl discovery but does not guarantee indexing or rankings. Sitemap availability and the live Pages deployment still need to be checked after publishing.
- Next recommended step: validate calculator behavior in a real browser, then create a Search Console property and submit the sitemap once the live site is stable.


### Trust and site-information pages — 2026-10-24
- Added `about.html`, `contact.html`, and `privacy.html` with unique page titles, descriptions, canonical URLs, responsive shared styling, and links back to the calculator site.
- Contact page directs issue reports to the public GitHub Issues page; no email address was invented.
- Privacy page explains browser-side calculator processing and notes that GitHub Pages may process technical request data; it links to GitHub's privacy statement.
- Updated `sitemap.xml` to include these three pages.
- Remaining: verify the live pages, test actual browser behavior, and submit sitemap through Search Console after confirming publication.


### Site-wide metadata and footer link audit — 2026-10-24
- Re-fetched all 13 HTML pages from the repository.
- Source-level audit confirms every page has a title, meta description, and canonical URL on the expected GitHub Pages domain.
- Confirmed all 13 pages link to About, Contact, and Privacy Policy in their footer.
- This checks repository source only; it does not establish that GitHub Pages has finished deploying or that a real browser renders every page correctly.


### BMI calculator and homepage directory — 2026-10-24
- Added `bmi-calculator.html` with metric height/weight inputs, input validation, formula explanation, unique metadata/canonical URL, FAQs, and links to other tools.
- Added a BMI calculation branch in `tools.js`; it returns the BMI number and clearly warns that BMI is a screening measure, not a diagnosis. It specifically avoids adult cut-off interpretation for children and teenagers, who need age- and sex-specific interpretation.
- Moved the homepage's all-calculators directory to immediately below the hero so visitors see the complete tool directory before the main marks calculator; added BMI to the directory.
- Added BMI to the navigation and related-calculator cards on the nine existing standalone calculator pages.
- Added the BMI page to `sitemap.xml`.
- Source-level verification is still needed after these edits. Browser testing and live deployment have not been confirmed.


### BMI calculator safety and meal-ideas improvement — 2026-10-24
- Improved the BMI page with age input and validation, cautious adult-only interpretation, and an estimated adult BMI screening range (18.5–24.9) clearly labelled as non-personal and non-diagnostic.
- For people under 18, the page reports the BMI number only, explains age/sex-specific interpretation, and does not suggest a target weight or weight-gain/loss plan.
- Added a food-preference-based balanced meal-ideas helper (vegetarian, vegetarian + eggs, or mixed foods), generated locally in the browser. It is explicitly labelled as rule-based, not AI-powered, and includes allergy/personal-needs cautions.
- A real AI integration was not added because this static GitHub Pages project has no secure backend/API endpoint. No API key is exposed in browser code and the site does not pretend the local helper is AI.
- Source changes committed; browser interaction and live deployment still need verification.


### BMI category and activity guidance update — 2026-10-24
- Improved adult BMI results to name the broad screening category (within range, above range/overweight, or higher BMI screening range) and, where applicable, calculate the arithmetic difference from a standard screening boundary. The page explicitly says this is not a personal weight-loss/gain prescription.
- Under-18 results continue to avoid target weights and weight-change amounts, and instead explain age/sex-specific growth-chart interpretation and encourage trusted-adult/clinical support.
- Added general public-health movement guidance with age distinctions, plus cautions to adapt activity and avoid treating the guidance as an individual prescription.
- Repeatedly disclosed that the meal helper is rule-based and AI is not connected. No secure backend or provider credentials were found in the static GitHub Pages project, so no fake AI integration or browser-exposed API key was added. Real AI requires a secure server-side endpoint and configured provider credentials; provider usage may cost money.
- Commits: `9919a9a` (BMI result logic) and `2c67e51` (page guidance). Automated/browser/live deployment testing has not been verified.


### CV builder React architecture — Step 3 foundation — 2026-10-25
- Added TypeScript resume data interfaces for personal details, experience, education, skills, languages, projects, certifications, custom sections, and design preferences.
- Added Zod schemas for core resume structures and full resume payload validation.
- Added a fresh-resume factory with default section ordering, visibility flags, and A4 design defaults.
- Added a shared unique-ID helper and a Zustand + Immer store with add/update/delete actions for repeatable entries, design updates, section ordering/visibility, validated resume loading, reset, and saved timestamp actions.
- Files: `src/features/resume-builder/schema/resume.types.ts`, `src/features/resume-builder/schema/resume.schema.ts`, `src/features/resume-builder/utils/id.ts`, `src/features/resume-builder/store/initialResume.ts`, `src/features/resume-builder/store/resumeStore.ts`.
- These files are foundation source only. React/Vite/Tailwind dependencies, app entry point, UI components, autosave adapter, tests, and browser/build verification have not been completed yet.
