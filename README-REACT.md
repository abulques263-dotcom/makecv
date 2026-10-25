# React CV Editor foundation

The existing static website remains at the repository root. The new React editor lives in `react-app/` to avoid overwriting the current homepage.

## Commands

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run build`

Vite uses `react-app/` as its root and writes the built editor to `cv-editor/`. The configured public URL is `/makecv/cv-editor/`.

The current GitHub Pages root-site workflow has not been changed by this setup. To publish the built editor, build the app and commit the generated `cv-editor/` files, or add a Pages workflow that preserves the existing static site while including this build output.
