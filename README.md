# Dudekula Asif Umar Baba — Portfolio Website

A responsive, zero-dependency personal portfolio website built from your resume using semantic HTML5, modern CSS (with Light & Dark themes), and vanilla JavaScript.

## Files

- `index.html` — Semantic page structure, SEO/OpenGraph metadata, JSON-LD profile schema, and accessible `<dialog>` modals.
- `styles.css` — Light/Dark theme design system, responsive layouts, interactive pipeline visualizer, and print-friendly styles.
- `script.js` — Theme persistence, scroll-spy navigation, interactive Speech AI pipeline explorer, skill category filters, project architecture modals, copy-to-clipboard buttons, and contact email composer.

## Quick Customization

Open `script.js` and update `PROFILE_CONFIG` at the top with your exact profile and repository URLs:

```js
const PROFILE_CONFIG = {
  email: "d.asifdudekula@gmail.com",
  phone: "+91 9032737904",
  linkedinUrl: "https://www.linkedin.com/in/your-handle",
  githubUrl: "https://github.com/your-username",
  projectRepos: {
    rag: "https://github.com/your-username/rag-doc-qa",
    dms: "https://github.com/your-username/donation-management-system"
  }
};
```

## Viewing Locally

Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

## Deploying for Free

- **GitHub Pages**: Push these files to a repository (e.g., `username.github.io`) and enable GitHub Pages in repository Settings.
- **Netlify / Vercel**: Drag and drop this folder directly into Netlify Drop or connect your GitHub repository.
