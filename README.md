# SP: Campus Odyssey

**Your campus. Your next chapter.** An independent, first-person 3D exploration RPG inspired by Singapore Polytechnic. Original WebGL 2 rendering, zero runtime dependencies.

## Play locally

Requires Node.js 20 or newer and a WebGL 2 browser. No package installation is required to play, build or run core tests.

```sh
node server.mjs
```

Open **http://localhost:4173**. Do not open index.html via file://; ES modules require an HTTP server.

```sh
node --test tests/*.test.mjs
node scripts/build.mjs
```

## Playable scope

- **684 × 684 game units**, one continuous world: no scene-loading between districts, no mission gates, and ground-floor interiors reached by walking through open entrances.
- **35 fictional role-holder NPCs in 35 furnished offices**: 4 executive leaders, 6 senior directors plus the Registrar, 11 academic directors, 13 corporate directors. Every role in the supplied brief is included.
- **35 individual projects**, each with accept → learning station → role-specific scenario → return to office → reward.
- **19 learning stations, 9 landmarks, 63 mapped places, 24 collectible memory prisms, 32 ambient students**.
- First-person look, walk, sprint, jump, wall collision, stamina, changing day/night palette and nearby location labels.
- Searchable map, minimap, waypoints, journal, role directory, backpack and badges.
- XP, levels, movement perks, autosave, export/import, confirmation dialogs and recovery controls.
- Touch movement/look pads, interaction/jump buttons, responsive menus and graphics-quality settings.

Academic Quality & Resources explicitly includes Library, Fabrication Lab, Academic Quality Centre, student feedback, course review and AI responsibilities.

### Campus of Tomorrow

Complete **6 academic projects**, **3 corporate projects** and the **PCEO project**, then present your proposal to the PCEO: at least **10 projects**. All districts remain open before and after completion.

Each project awards **120 XP + 35 campus credits**. Each prism awards **30 XP**. The final proposal awards **500 XP + 150 credits**, once. Credits are a contribution score, not spendable currency or real money. Every **360 XP** earns a level. Each level adds **0.2 m/s** walking speed, capped at **+2 m/s**. Level **4** improves stamina recovery.

### Controls

| Control | Action |
|---|---|
| WASD | Move / strafe |
| Mouse | Look after clicking the world |
| Left / right arrows | Turn without pointer lock |
| Up / down arrows | Move forward / backward |
| Shift | Sprint |
| Space | Jump |
| E | Talk / investigate / collect |
| M | Map |
| J | Journal |
| Escape | Pause / release mouse / close dialog |
| ? | Help |
| Touch pads | Move / look |

If stuck, use **Settings → Return to welcome plaza**. Map lines indicate direction, not obstacle-free routes.

## Authenticity and sources

- https://www.sp.edu.sg/staticfile/CampusMap/index.html
- https://www.sp.edu.sg/about-sp/campus-map-and-facilities
- https://www.sp.edu.sg/about-sp/campus-map-and-facilities/wayfinding-around-campus

Facility names draw on these public sources. Responsibilities follow the supplied brief. All characters, dialogue, projects, coordinates and office allocations are fictional. This is **not an official SP product, an exact campus reconstruction, or real-world navigation guidance**. Ground-floor rooms are playable; upper floors are decorative. Not every real campus block or room is modelled. Swimming, train travel, combat, multiplayer and voice acting are not implemented. Geometry is original; proprietary maps, photographs and 3D assets were not copied.

## Verification and release status

**11 core tests passed locally**: content coverage, all 35 project state machines, exact campaign requirements, save validation, duplicate reward protection, movement collision, finite geometry, HTTP security and a player-clearance flood fill proving all offices, learning stations and collectibles are reachable from spawn.

The **Verify campus** Actions workflow also tests desktop and mobile-emulated Chromium: WebGL rendering, all projects through UI controls, campaign completion/reload, movement/pause, search, invalid-save recovery and graphics-context recovery. Screenshots and reports are uploaded as **browser-verification**. Check the latest Actions run for browser results; configured tests alone do not prove they passed.

This is a substantial playable implementation, **not a production-certified or AAA-scale release**. Local browser/GPU testing was unavailable. Before public launch, review CI results and test real desktop/mobile hardware, Safari/Firefox, accessibility, sustained performance, content accuracy and institutional permissions. Menus include keyboard navigation, focus trapping, labels and live feedback; full nonvisual 3D navigation is not supported.

## Deployment

Build with `node scripts/build.mjs`, then publish **dist/** to a static host. Runtime references are relative and support repository subpaths. HTTPS is recommended. No backend, database, account, API key or CDN is required.

For GitHub Pages, enable **Settings → Pages → Source: GitHub Actions**, then run **Publish to GitHub Pages (manual)** if Pages is available for the repository/account. The repository is private by default. No public site is automatically published. Review account eligibility and resulting site visibility before deploying.

A non-root container definition is included. The supplied Node server serves only runtime files and adds content-security and MIME protections. Internet-facing server deployments should use a TLS reverse proxy. Container and Pages configurations require validation in the target hosting environment.

## Architecture

- `src/data.js`: every role, responsibility, scenario, reward, location and source link.
- `src/world.js`: procedural geometry, furnishing, collision and NPC placement.
- `src/engine.js`: WebGL 2 shaders, instancing and camera matrices.
- `src/state.js`: deterministic progression, movement and versioned save validation.
- `src/game.js`: simulation, input, dialogue, menus and maps.
- `server.mjs`: dependency-free HTTP server.
- `tests/`: core, HTTP and browser integration tests.

Extend data and geometry together, updating count assertions and connectivity tests. The `?test=1` query exposes a local test harness, not a networking or authentication interface.

## Privacy

Progress stays in localStorage under **sp-campus-odyssey-v1**. Autosave runs every **5 seconds of active play** and after important actions. No analytics or personal data transmission. Export backups before clearing site data. Imports are capped at **100 KB** and require confirmation. Storage failures show an export fallback.
