# Gym log

A small personal gym tracker. It's a single-file PWA: install it to your phone's
home screen, it works offline, and it stores everything locally.

Live: `https://gianlucagrillo.github.io/gymlog/`

## What it does

- **Multi-day routine** — editable from inside the app: add, rename, reorder or
  delete exercises and days without touching the code.
- **Several saved routines** — e.g. a specialisation block and the plan that
  follows it. Duplicate one to start the next; exercises you keep share their
  history with the original.
- **Training cycle** — set a start date and length per routine and the header
  shows "Week 3 / 6", turning red once the planned block is over.
- **Priority exercises** — flag the lifts that matter most in the block; they
  are highlighted in the workout view.
- **Sets per muscle** — each exercise has a target muscle, and the Data view
  shows sets logged since Monday against the weekly plan.
- **Per-set logging** — tick ✓ after each set: the row turns green, the rest
  timer starts on its own, and the exercise is saved once the last set is
  ticked, then the next exercise opens. Inputs are pre-filled from your last
  session; "Log all sets at once" is still there.
- **Progression** — delta against the previous session, a sparkline of the last
  8 sessions, a line chart per exercise (est. 1RM, or reps for bodyweight
  moves; tap a point to jump to that session), and an automatic nudge when you
  hit the top of the rep range on every set (or when you tick "too easy").
- **Records** — best weight, estimated 1RM (Epley formula) and session volume,
  with a `PR` badge. Beating a record mid-workout pops a banner with confetti.
- **Workout summary** — when every exercise of the day is done: duration, sets,
  volume, PRs and the change versus the last time you trained that day.
- **Consistency** — a calendar of gym days over the last 17 weeks, with the
  current and best run of full weeks.
- **Rep targets** — each open set row shows the reps your recent sessions
  predict at that weight (inverse of the Epley 1RM estimate, per set position
  so later sets account for fatigue); checked sets show how many reps you did
  above or below it.
- **Strength balance** — how much each muscle's est. 1RM has grown since the
  cycle started, with push/pull, front/rear delts, quads/hamstrings and
  biceps/triceps compared. It compares progress, not kilos, because dumbbells
  and machines can't be compared by weight.
- **Rep predictor** — "if I do 30 kg × 8 on A, how many reps at 24 kg on B?",
  using the ratio between the two exercises in your own logs, with a data
  confidence level. Same-name exercises on different days count as one.
- **Rest timer** — anchored to the clock, so it stays accurate even if you lock
  the screen or switch views. While resting, a bar pinned above the bottom
  navigation shows the countdown with +30s and Stop; tap it for a full-screen
  ring with the next set's weight and reps. Vibration and a beep when the rest
  is over.
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
