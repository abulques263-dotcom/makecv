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
