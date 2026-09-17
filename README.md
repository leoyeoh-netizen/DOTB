# WARNING. THIS IS STILL W.I.P.

# DistroOnTheBase 🐧

A fast, open-source centralized portal for discovering Linux distributions and jumping directly to official ISO download sources.

## Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Updating distro data

All distribution metadata lives in `src/data/distros.ts`. Add or edit an entry there instead of changing UI components.

For production, replace placeholder versions/checksums with values verified against each distribution's official release page. Keep downloads pointed at official distribution servers or recognized mirrors.

## Design goals

- One-click path to official downloads
- No account or popup requirements
- Dark, Linux-inspired UI
- Keyboard-friendly search and filters
- Responsive cards and details modal
- Structured metadata for easy contribution

## License

Not decided yet.

## Disclaimer

STILL WORK IN PROGRESS

DistroOnTheBase is an independent open-source project and is not affiliated with or endorsed by the Linux distributions listed on this website. Trademarks and logos belong to their respective owners.
