# S.T.A.L.K.E.R. Clicker

A small browser clicker game inspired by the atmosphere of the Zone: earn coupons, upgrade your click power, improve protection, collect artifacts, survive emissions, and claim a daily stash bonus.

> Fan-made educational project. This project is not affiliated with, endorsed by, or sponsored by GSC Game World or the official S.T.A.L.K.E.R. franchise.

## Demo

```text
https://papugaxx.github.io/S.T.A.L.K.E.R.-Clicker/
```

## Screenshots

| `docs/screenshots` | 

## Features

- Clicker gameplay with coupon income (`KPN`).
- Artifact progression with levels and progress bar.
- Upgrade shop for click power and protection.
- Emission timer that can remove part of the player's coupons.
- Artifact shop with unlock requirements.
- Daily bonus modal saved in `localStorage`.
- Music and sound toggles.
- Custom cursor and Zone-inspired HUD styling.
- Modular vanilla JavaScript structure.
- Responsive layout for desktop, tablet, and mobile screens.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript with ES modules
- Browser `localStorage` for save data

No build step and no external runtime dependencies are required.

## Project Structure

```text
.
├── assets/
│   ├── sounds/
│   └── images and icons
├── docs/
│   └── screenshots/
├── js/
│   ├── audio.js       # Music and sound controls
│   ├── config.js      # Artifact configuration
│   ├── gameLogic.js   # Purchases, artifact logic, daily bonus
│   ├── main.js        # App initialization and DOM events
│   ├── state.js       # Runtime state and prices
│   ├── storage.js     # Save/load from localStorage
│   ├── systems.js     # Timers, passive effects, emissions
│   └── ui.js          # HUD updates and notifications
├── index.html
├── NOTICE.md
└── styles.css
```

## How to Run Locally

Because the game uses JavaScript modules, run it through a local static server instead of opening `index.html` directly.

### Option 1: Python

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

### Option 2: Node.js

```bash
npx serve .
```

## Gameplay Notes

- The player earns coupons by clicking the active artifact.
- Upgrades increase income or reduce emission damage.
- The daily bonus can be claimed once per day.
- Progress is stored locally in the browser, so clearing browser data resets the save.

## Roadmap Ideas

- More artifacts with unique passive effects.
- More upgrade types and balancing improvements.
- Achievements.
- Mobile-first layout improvements.
- Save import/export.
- Separate settings menu.

## Asset / Rights Checklist

Before making the repository public, verify that all images, icons, fonts, and sounds are either original, licensed for reuse, or replaced with assets you are allowed to publish.

## License

No open-source license is included yet because the asset rights should be verified first. Add a license only after confirming that the code and assets can be published under it.
