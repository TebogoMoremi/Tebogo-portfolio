# Portfolio redesign — updated 15 October 2026

## Completed: section polish and shared interactions

Added a reusable GlassCard component with restrained mouse tilt, pointer highlights, keyboard focus treatment and reduced-motion support. About now combines the personal story with four strengths; Experience gains scroll progress; Skills gains clearer category headings; Projects gains recognizable cover symbols. Existing employment and project data are preserved.

SectionAtmosphere uses one shared decorative renderer that changes with the reading section: sparse lavender forms for About, blue connections for Experience, cyan particles for Skills, a tilted grid for Projects, an infrastructure network for DevOps and quiet particles for Contact. AmbientScene limits particles to 72 on desktop and 24 on mobile, with bounded neighbor checks. The existing viewport wrapper supplies pause/resume, hidden-page suspension, reduced-motion/static fallbacks and offscreen cleanup. The background pause control is rendered outside the decorative layer so it remains accessible.

ServiceCatalog adds nine selectable AWS and delivery service cards with readable descriptions alongside the existing architecture explorer. Responsive layouts collapse the story, strengths and service grids for smaller screens. No dependencies, backend code or infrastructure configuration were changed.

Validation after these section changes:

- Production build passed: main JavaScript 522.86 kB minified / 168.79 kB gzip; lazy renderer 924.12 kB / 247.51 kB gzip. Vite's bundle-size warning remains.
- Lint passed without warnings; all three starfield motion tests passed; git diff whitespace checks passed.
- Latest browser verification was blocked by the app's browser URL policy. No workaround was attempted. The earlier desktop/mobile browser results below apply to the earlier implementation, not to these new section changes.
- Latest breakpoint rendering, physical GPU profiling, forced WebGL failure and live AI backend responses remain unverified. The earlier unavailable chat endpoint remains an outstanding integration check.

New components: src/components/{GlassCard,SectionAtmosphere,ServiceCatalog}.jsx and src/three/AmbientScene.jsx. Updated App, About, Experience, Skills, Projects, DevOpsLab, SceneCanvas, SceneViewport and the shared stylesheet. Changes are saved on the existing feature branch; nothing was pushed, merged or deployed.

## Latest: interactive starfield and unified colors

The existing laptop, cloud, orbiting logos, skills explorer and infrastructure objects are preserved. HeroComposition positions the existing objects inside the same full-hero canvas as Starfield. There is no overlapping background canvas. The original in-progress color edits were carried forward into the supplied navy/cyan/blue palette.

Starfield uses one Points draw call, seeded natural distribution, three depth populations, soft radial point shaders, and preallocated position/brightness buffers. Desktop uses 480 stars; mobile uses 130. A 145px mouse influence radius produces small eased displacements (up to 18px before distance falloff), brightness changes and a decaying luminance trail. Layer drift and parallax give depth; leaving the hero eases displacement back. Touch input does not activate mouse effects. Constellation lines were intentionally omitted to keep the scene quiet and avoid additional connection work.

The renderer remains lazy, DPR-capped, paused on demand and when the page is hidden, and unmounted offscreen. Reduced-motion/low-resource devices and WebGL failures use the static CSS starfield with laptop/cloud artwork. The hero artwork is hidden from assistive technology, while the pause control and all normal content remain accessible. Existing secondary scenes retain accessible descriptions and control lists.

Colors are organized with reusable background, surface, accent, text, border and radius variables. Navy surfaces, blue buttons, cyan highlights, restrained violet and emerald availability indicators now carry through cards, navigation, badges, footer and chat. Headings, greeting, line spacing and sizing were refined using the existing system-font stack, without introducing remote font requests. Hero, About and Contact wording is more direct and personal; employment/project data is unchanged.

Validation for this phase:

- Production build passed; renderer chunk remains about 922 kB minified / 247 kB gzip and triggers Vite's existing size warning.
- Lint passed without lint warnings.
- `node --test tests/starfieldMotion.test.js`: 3 tests passed, covering repulsion/return, influence radius, and ambient touch behavior with buffer reuse.
- Color calculations passed 4.5:1 for the five sampled text/background pairs: primary text 18.27, secondary 10.43, muted 6.04, cyan 10.58, blue button label 4.99. This is a targeted check, not a whole-site accessibility audit.
- Browser: desktop 1280px and mobile 390px; one hero canvas, no measured horizontal page overflow, visible stars and centerpiece, pause/resume behavior and mobile chat verified. No console errors observed in these checks.
- CV download completed through the browser. Prior chat endpoint unavailability remains unresolved; successful backend/Gemini responses were not re-verified in this phase.
- No physical GPU profiling, forced WebGL failure, OS reduced-motion emulation or automated end-to-end pointer screenshot comparison was performed. Smooth return/displacement was checked with the pure motion tests; visual rendering was inspected in-browser.

Files for this phase: index.html; src/index.css; src/chat.css; src/components/{Hero,About,Contact}.jsx; src/three/{HeroScene,SceneCanvas,SceneViewport,HeroComposition,Starfield}.jsx; src/three/starfieldMotion.js; tests/starfieldMotion.test.js; this report. Backend and infrastructure files remain untouched. See the final response or git log for the saved commit.

## Follow-up: warmer, tangible 3D

Replaced the faceted core with a locally modelled laptop, code editor, keyboard and soft cloud. Restored recognizable technology logos in rounded tiles, reduced particles and simplified the orbital paths. Added soft warm/cool studio lighting. Architecture now uses miniature laptops, clouds, server racks, storage stacks and an envelope for alerts. Static fallback also uses laptop/cloud imagery. No downloaded models or new dependencies.

Validation: production build and lint passed; desktop hero inspected without console errors; architecture scene and ECS selection verified. Lazy renderer is approximately 918 kB minified / 246 kB gzip; the main bundle is approximately 506 kB / 163 kB gzip. Earlier validation below describes the initial redesign.

## Delivered

- Recruiter-first hero: name, full-stack/cloud role, technology highlights, work/CV/contact actions and a dedicated interactive 3D composition.
- Three.js: illuminated faceted core, rotating orbital rings, floating/orbiting technology labels, sparse deterministic particles and damped pointer parallax.
- Skills: selectable categories and technologies, individual technology descriptions, an interactive constellation and a complete keyboard-accessible list.
- DevOps: selectable infrastructure nodes, animated data packets, service explanations and a permanently readable 2D request/monitoring diagram.
- Visual system: navy surfaces, cyan accents, subtle violet orbits, restrained glass effects, responsive typography and consistent cards, timeline and hover treatments.
- Existing Framer Motion section reveals retained; global reduced-motion configuration added. About gains subtle CSS depth without an extra canvas.
- Existing projects and data structure retained. The existing `#` URLs now display unavailable-link labels instead of opening the same page.
- Responsive navigation, Escape dismissal, skip link, focus outlines, pressed states, accessible scene descriptions and chat focus/live-region improvements.

## Performance and mobile

The renderer is a lazy-loaded Suspense chunk. Scenes unmount outside the viewport, use demand rendering while paused or in a hidden tab, and cap DPR at 1.5 (1 on mobile). Mobile uses fewer particles, fewer hero orbit labels and rings, and no pointer camera movement. Low-memory, low-core-count, data-saving and reduced-motion devices use a CSS fallback. Canvas exceptions and context loss are isolated by an error boundary. No new dependencies, postprocessing, external fonts or infrastructure changes were introduced.

## Architecture evidence

Checked README.md, cloudfront-config-ai.json, tebogo-portfolio-ai-task.json, the existing SNS alarm helper, deployment workflow and PortfolioKnowledgeService.java. The map represents CloudFront → S3/React or ALB → ECS/Fargate → Spring Boot → local knowledge first, Gemini when needed. ALB/ECS monitoring flows to CloudWatch → SNS. It is explicitly labelled as architecture, not live telemetry. Backend, Gemini, deployment, Docker, rate-limit policy and AWS files remain unchanged.

## Validation

- `npm run build`: passed. Vite reports the lazy Three.js renderer exceeds its 500 kB chunk warning threshold (approximately 913 kB minified / 244 kB gzip).
- `npm run lint`: passed without lint warnings after cleanup.
- `git diff --check`: passed. Git reports ordinary LF/CRLF conversion notices on this Windows checkout.
- Browser checks: desktop 1280px and mobile 390px; no document horizontal overflow in either measured viewport. Hero and skills WebGL rendering, category selection, AWS service selection, mobile menu open/Escape dismissal, chat opening and input focus verified.
- Chat request attempted through the existing integration: displayed its unavailable-service response. Live backend/Gemini success and rate-limit responses were not verified.
- CV link and existing 28,912-byte PDF asset verified in source/filesystem; an actual browser download was not executed.
- No existing test script is defined. No unit-test suite was claimed or added for visual styling.
- No forced WebGL-loss, OS reduced-motion emulation, physical-device GPU profiling or production infrastructure tests were executed. Fallback and reduced-motion paths were reviewed in code.
- Browser emitted a dependency-level `THREE.Clock` deprecation warning; no application runtime exception was observed during the successful scene interactions.

## Files

Modified: index.html; src/App.jsx; src/index.css; src/components/{Hero,Navbar,Skills,DevOpsLab,Projects,About,AIChat,Footer}.jsx; src/three/HeroScene.jsx.

Added: src/chat.css (existing chat styling extracted); src/components/ArchitectureExplorer.jsx; src/data/{architecture,skillDescriptions}.js; src/three/{SceneViewport,SceneCanvas,ArchitectureScene}.jsx; this report.

## Follow-up

Verify the deployed AI endpoint before release, supply real project URLs when ready, profile on a physical low-end phone, and run forced context-loss/reduced-motion checks. Consider further renderer bundle optimization and an upstream Fiber/Three compatibility update to address the Clock deprecation. No merge, push or deployment was performed.

Work is saved on `feature/portfolio-recruiter-redesign`. See the final chat response or `git log` for the commit hash.
