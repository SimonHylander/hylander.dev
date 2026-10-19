# Product

The content brief for hylander.dev. Every page is written from this file. When a fact here changes, update it here first, then in the content data.

## Register

brand

## Users

**Primary: hiring managers, CTOs and founders** at product companies hiring a senior or lead engineer, in Stockholm or remote within the EU. Simon is employed, so the site serves people who find him rather than applications he sends. They arrive from LinkedIn, X, GitHub or a name search and stay one to three minutes. They need four answers:

1. What does he build?
2. At what level?
3. With what result?
4. How does he think?

**Secondary: engineers** in the T3, Effect and AI-tooling circle, arriving from X. They come for the writing.

## Product Purpose

hylander.dev establishes credibility for senior and lead engineering roles. A visit succeeds when the visitor can say in one sentence what Simon builds and can name one result. Contact follows from that and is not the only goal.

Most of Simon's work since 2024 is in private repositories. The site replaces code as proof: it explains the work in writing, with the problem, the decisions and the result.

## Positioning

**Line (draft):** Senior TypeScript engineer in Stockholm. I build integration platforms and AI workflows on foundations that last.

Every page supports at least one of three pillars. Each pillar is backed by the evidence listed in the Proof inventory below.

1. **Integrations.** Ten years of connecting systems that were not designed to talk to each other:
   - Servus REST middleware over Oracle Forms
   - the Treddy partner platform
   - the Byggdagboken backend-for-frontend
   - Proposales PMS and CRM integrations
   - `ohm`
2. **Architecture that survives change.** Migrating live products without stopping them:
   - strangler-fig migration with route-level canaries
   - a local-first rearchitecture
   - release routines that ended major incidents
   - Effect as the default for typed, testable services
3. **AI-native engineering.** Using agents to raise the quality bar, not lower it:
   - AI code review that cut senior review time by 80%
   - an AI context framework for a product team
   - the Uppgraderingspaket RAG pipeline

**Not positioned on:**

- **Language breadth.** The current 20-icon stack grid says "generalist" and adds nothing.
- **Work from before 2018.** PHP, Oracle and SOAP appear as one line of history, not as projects.

## Proof inventory

Claims the site may make, and their source. Only claims marked public can appear on the site without asking anyone first.

| Claim | Where | Metric | Public | Source |
| --- | --- | --- | --- | --- |
| AI code review introduced across the team | Byggdagboken | 80% less senior review time | Yes | LinkedIn, current resume |
| Release routines changed | Byggdagboken | Zero major incidents in subsequent releases | Yes | LinkedIn |
| Localization pipeline automated | Byggdagboken | 10 new languages launched | Yes | LinkedIn farewell post |
| Strangler-fig migration from PHP/Angular.js to Next.js with CloudFront Functions canaries | Byggdagboken | None yet | Yes | LinkedIn, current resume, bragdoc |
| Local-first rearchitecture of the apps and web client | Byggdagboken | None yet | Yes | LinkedIn farewell post |
| Backend-for-frontend for the native apps, plus OAuth2/OpenID with PKCE | Byggdagboken | None yet | Yes | LinkedIn, bragdoc |
| Node.js BFF aggregating data across microservices; Authorization Code + PKCE with Redis for short-lived tokens | Byggdagboken | None yet | Yes | LinkedIn projects |
| Led client engineering (web and mobile) and a small app team, and owned the delivery roadmap and backlog with management | Byggdagboken | None yet | Yes | LinkedIn |
| Context framework and practices for working with AI | Byggdagboken | None yet | Yes | LinkedIn projects |
| Led the technical architecture and development of a fraud-reduction startup for online marketplaces, Sep 2021 to Apr 2024, via Skoglit | Treddy | None yet | Yes | LinkedIn projects |
| Integration platform with an API layer and a real-time webhook system | Treddy | 6 strategic partner integrations | Yes | LinkedIn projects |
| Integrations with BankID, Finnish Trust Network, Stripe, Swish, Ping Payments, nShift and Schenker | Treddy | None yet | Yes | LinkedIn projects |
| Treddy Developer Platform: partner API with OAuth, REST and webhook events; partner onboarding and docs, Dec 2022 to Apr 2024 | Treddy | None yet | Yes | LinkedIn projects |
| Secure payment flows with an emphasis on accessibility and user trust | Treddy | None yet | Yes | LinkedIn projects |
| Lead developer across client projects, and mentored interns and juniors | Skoglit | None yet | Yes | LinkedIn |
| AI price matching for PC hardware, Oct 2025 to present: RAG chat search; Inngest scraping into a vector database; embeddings as LLM context; Next.js on Vercel | Uppgraderingspaket | Live site | Yes | LinkedIn projects |
| Integrations for hotels: OPERA Cloud, pricing and catering packages | Proposales | None yet | Ask Proposales | GitHub PR activity |

## Case studies

These are the candidates, ranked by how well each proves a pillar. Every case study follows the same shape: problem, my role, constraints, decisions, result, stack.

1. **Treddy partner platform** (Integrations). Public, has a metric, and Simon was the architect.
2. **Byggdagboken strangler-fig migration** (Architecture). Covers the canaries, the BFF and auth.
3. **AI code review at Byggdagboken** (AI-native). It has the strongest metric on record.
4. **Uppgraderingspaket** (AI-native). A live product and a side project Simon owns end to end.
5. **Proposales integrations** (Integrations). Only after Proposales approves what can be shown.

## Content map

- **`/`**: everything a hiring manager needs, in one scroll.
  1. The positioning line
  2. What Simon does now
  3. Selected work (case studies 1 to 4)
  4. Writing
  5. A short career history
  6. Contact
- **`/work/[slug]`**: one case study.
- **`/writing/[slug]`**: one post.
- **`/cv`**: the full career history as a print-friendly page. It replaces a PDF.

Every page has its own title, description and Open Graph image. The site has one canonical identity: Person structured data with `sameAs` links to GitHub, LinkedIn and X.

## Voice

The voice comes from Simon's X posts: short, plain, specific and opinionated.

- Write in the first person.
- Use numbers and named systems instead of adjectives. Write "cut senior review time by 80%", not "significantly improved".
- Make one claim per sentence, and back each claim with something from the proof inventory.
- Hold opinions and state them plainly, for example "Quality should be the foundation of your product".
- Never use "passionate", "seasoned", "rockstar", "I build things" or a list of technologies as an identity.
- Show the stack in each case study. There is no global skills grid.

## Brand Personality

Precise · Opinionated · Builder

The site feels like it was made by an engineer who has an opinion about every detail and can explain each one. Personality comes from the copy, the structure and the craft, not from widgets.

## Anti-references

- Generic SaaS portfolio templates: hero metrics, identical icon-card grids, gradient text, glass cards as decoration.
- The dark-mode neon "hacker" developer look.
- Obvious AI-generated UI: interchangeable purple gradients, glassmorphism, side-stripe accent borders, modal-first interactions.
- A corporate resume PDF pasted onto a webpage: stock icon rows, flat grids, no point of view.
- Skill-level bars and technology logo walls.

## Design Principles

1. **The UI is the proof.** Polish and intentionality are part of the hiring signal.
2. **Credibility before conversion.** Optimize for a convincing read on senior and lead caliber. Contact is a natural follow-on.
3. **Written proof over private code.** Case studies carry the argument that the repositories cannot.
4. **One fact, one place.** Content lives in typed data, and pages render it. No fact is typed twice.
5. **Practice what you preach.** Fast, accessible and readable, with respectful motion.

## Accessibility & Inclusion

The baseline is pragmatic:

- semantic HTML
- keyboard-accessible navigation and interactive elements
- visible focus states
- alt text on meaningful imagery
- `prefers-reduced-motion` respected

Text contrast meets WCAG AA.

## Open questions

1. **Proposales:** What can be shown publicly, and are there results with numbers?
2. **Treddy:** Is the platform still live, and are there numbers beyond the 6 integrations, such as volume, partners or fraud reduction?
3. **Availability:** What does the site say? For example "Not looking, but open to a good conversation."
4. **Photo:** Does the site use a portrait?
