# Gym log

A small personal gym tracker. It's a single-file PWA: install it to your phone's
home screen, it works offline, and it stores everything locally.

Live: `https://gianlucagrillo.github.io/gymlog/`

## What it does

- **Multi-day routine** — editable from inside the app: add, rename, reorder or
  delete exercises and days without touching the code.
- **Per-set logging** — weight and reps for every single set, with the inputs
  pre-filled from your last session so you only change what moved.
- **Progression** — delta against the previous session, a sparkline of the last
  8 sessions, and an automatic nudge when you hit the top of the rep range on
  every set (or when you tick "too easy").
- **Records** — best weight, estimated 1RM (Epley formula) and session volume,
  with a `PR` badge when you beat your best estimated 1RM.
- **Rest timer** — anchored to the clock, so it stays accurate even if you lock
  the screen or switch views. Vibration and a beep when the rest is over.
- **Backup** — JSON export/import, via file download or copy-paste.

## Where the data lives

All in `localStorage`, in that one browser. No account, no server, no sync
between devices.

Which means **if you switch phone or the browser clears its storage, the data is
gone**: every so often use Data → "Download .json backup".

## Deploy

Five files get published: `index.html`, `manifest.json`, `service-worker.js`,
`icon-192.png`, `icon-512.png`.

On GitHub Pages: Settings → Pages → Source "Deploy from a branch", branch `main`,
folder `/ (root)`. It's live about a minute later.

On your phone:

- **Android (Chrome)**: open the link, ⋮ menu → "Add to Home screen".
- **iPhone (Safari)**: open the link, Share icon → "Add to Home Screen".

## Data migration

Sessions saved by earlier versions (`gymlog-entries-v3`) are converted
automatically on first launch, adding the reps field (left empty for existing
history). The v3 key is not deleted, so it stays around as a fallback.
