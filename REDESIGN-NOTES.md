# Portfolio redesign — 14 October 2026

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
