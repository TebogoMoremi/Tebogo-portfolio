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

## WhatsApp and contact completion — 15 October 2026

Added reusable WhatsAppButton with the supplied +27782708321 number and exact encoded recruiter message. Both links use official wa.me click-to-chat, open a new tab with noopener/noreferrer and never send automatically. A green circular action offers keyboard focus and a hover/focus tooltip. It shares a vertical layout with Ask Tebogo AI, hides while the assistant is open, and respects mobile safe areas. Footer spacing reserves room for floating controls; mobile navigation hides the floating dock.

Contact now has four shared glass cards for the existing email, LinkedIn, GitHub and new WhatsApp link, with clear action text. Hero actions read Explore My Work, Download CV and Let's Talk. The existing tested starfield and shared section atmospheres were reviewed and retained; no additional canvases, particle work or dependencies were added. No backend or infrastructure files changed.

Validation: production build passed; lint passed; all three existing motion tests passed. Executed assertions verified the WhatsApp destination and exact message round-trip, new-tab protections, and local CV PDF signature. Diff reviewed for unrelated changes and credentials; no new secrets found. Contact destinations match the existing source. Browser policy still prevents rendered checks, including the requested 320/375/425/768/1024/1440/1920 widths, WhatsApp handoff, console inspection and live AI interaction; these are not claimed as tested. Existing bundle-size warnings remain (main 524.44 kB and lazy renderer 924.12 kB minified).

Changed files: src/components/{WhatsAppButton,AIChat,Contact,Hero}.jsx, src/index.css and this report. Existing branch: feature/portfolio-recruiter-redesign. GitHub Actions configuration runs on main pushes and PRs targeting main, not ordinary feature-branch pushes. No manual AWS deployment or merge is requested or performed. Push and remote verification results are reported in the final response.

## Premium experience completion — 15 October 2026

Assessment: the shared glass cards, personal About layout, employment timeline, categorized HTML skills, interactive AWS explorer, contact cards, WhatsApp and shared atmospheres were already implemented. This pass improves remaining presentation, accuracy and loading gaps without duplicating them.

- Homepage and Three.js: clearer specialization badge without an unconfirmed availability claim; Explore Projects CTA; WhatsApp social link; more white-weighted stars and lower brightness behind the reading column. Existing laptop, cloud, depth layers, pointer response and mobile particle limits remain. No extra canvases or postprocessing.
- Design system: Space Grotesk headings, Inter body and JetBrains Mono labels via Google Fonts with swap and local fallbacks. Existing colors, spacing, cards and responsive rules retained. External font delivery was not browser-verified.
- About, Experience and Skills: renamed the capability to Backend & Integrations; preserved verified experience and skills. The existing timeline carries the engineering journey rather than adding duplicate content or invented milestones.
- Projects: larger labeled concept artwork and native keyboard-accessible engineering disclosures for all four existing projects. Descriptions use existing information; no screenshots, repositories, demos, achievements or detailed case-study claims were invented. Unavailable links are explicitly marked not linked.
- DevOps: clarified that the workflow deploys frontend assets and publishes ECR images, while automatic ECS/Fargate deployment is disabled. The configured backend architecture is not presented as proof of live availability.
- AI: friendly greeting, four suggested questions, accessible loading text, on-demand module loading, loading fallback and chunk-load error boundary. API contract, backend, Gemini and rate-limit handling remain unchanged.
- WhatsApp: hero link added and the shared message updated to the exact latest wording. All three entry points share the same URL; no automatic message sending.
- SEO: added Open Graph and Twitter tags, accurate Person JSON-LD, and a locally generated 1200x630 PNG social card (visually inspected). Existing favicon retained. No canonical URL was invented: a verified public origin is still needed for canonical/og:url and absolute social-image URLs. Social crawler rendering is not verified.
- Performance: initial JavaScript decreased from 524.44 kB / 169.67 kB gzip to 402.32 kB / 131.86 kB gzip. AI now loads as a separate 124.48 kB / 38.49 kB gzip chunk only after interaction. Lazy Three.js remains 924.15 kB / 247.54 kB gzip and retains Vite's size warning.

Validation executed: production build passed, lint passed without warnings, all three existing motion tests passed, git diff whitespace check passed. Server-rendered component assertions passed for four contact destinations, exact WhatsApp message, four native project disclosures, absence of placeholder project anchors, initial chat launcher, JSON-LD parsing, built CV PDF signature and social image presence. Diff reviewed for accidental credentials and unrelated modifications; no new secrets found. These source/server checks do not validate browser behavior.

Browser URL policy still blocks rendered inspection. All requested viewport widths, overflow, font loading, live WebGL, console, keyboard interactions, WhatsApp app handoff and live AI backend responses therefore remain unverified in this pass. No attempt was made to bypass the browser restriction. Real screenshots and deeper project case studies still require verified source material.

Quality review: recruiter information remains prominent; native disclosures and readable HTML preserve accessibility; deployment copy now distinguishes topology from live service availability. Backend, infrastructure and workflow files were not changed. No merge or manual deployment.

Files: index.html; public/social-preview.png; src/App.jsx; src/components/{ContactDock,AIChat,About,ArchitectureExplorer,Hero,Projects,WhatsAppButton}.jsx; src/three/Starfield.jsx; src/index.css; this report. Branch: feature/portfolio-recruiter-redesign. Commit and push verification are provided in the final response.

## Visible moving backgrounds and email cards — 15 October 2026

Made non-hero section surfaces transparent so they no longer hide the shared ambient renderer. Raised particle brightness and size, added visible multi-axis drift, rotating edge rings/polyhedra, brighter bounded network connections and a gently moving project grid. Particle placement now follows viewport proportions (110 desktop / 40 mobile); floating geometry is limited to four desktop / two mobile objects. Contact retains a calmer particle treatment. Hero stars drift faster with a slightly larger travel range. Existing shared rendering, pause, hidden-page suspension, reduced-motion/static fallback and device pixel ratio caps remain.

Included the requested full-card email link with encoded subject and recruiter draft, keyboard focus and corrected arrow glyphs; LinkedIn/GitHub cards also use semantic whole-card anchors. No automatic sending. Changes are confined to Contact, GlassCard, AmbientScene, starfieldMotion and CSS, plus this report. Earlier redesign features, verified content, metadata, chat, WhatsApp, backend and infrastructure remain intact.

Build, lint, existing motion tests and whitespace checks were executed for this pass; see final response for results. Browser policy continues to prevent rendered visual verification, so visibility/motion implementation is source-validated but not visually confirmed at the requested breakpoints. Existing Three.js bundle warning remains. Prior report sections describe remaining live backend and canonical URL verification gaps. No merge or deployment.
