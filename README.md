# Gym log

A small personal gym tracker. It's a single-file PWA: install it to your phone's
home screen, it works offline, and it stores everything locally.

Live: `https://gianlucagrillo.github.io/gymlog/`

## Design (v15)

Rebuilt look, one design system for every screen: Satoshi type, a warm "ember"
palette (amber → orange gradient on near-black), frosted-glass panels over a
soft mesh gradient with a light film grain, and a floating glass tab bar with
four sections:

- **Workout** — *Today*: week strip (done days, rest days, what's next), the
  day's card with a sets ring and Start / Continue, warm-up / cool-down, and the
  exercise list with the weight to aim for today. *Active workout*: every
  exercise on one page as a glass card, the current one open with a
  Set · Previous · kg · Reps · ✓ table, −/+ steppers, a tip, warm-up sets and
  Log all; ⇄ to substitute, ⋯ for chart, stats and history (move / delete).
  Finish ends the session and opens the recap.
- **Progress** — Overview (this week, full weeks in a row, month calendar —
  tap a day for its recap — and sets per muscle vs plan), Lifts (every lift with
  est. 1RM and a sparkline, chart of the selected one), Balance (strength
  balance and rep predictor).
- **Routine** — the active routine's days as cards; tap an exercise to edit it
  in a sheet (numbers, muscle, superset, priority, alternatives, order). Change
  switches, renames, duplicates, creates or deletes routines.
- **Settings** — training cycle, rest days, rest-end sound; GitHub sync,
  export / copy / restore backup, delete history.

Motion (v16): screens fade in when you change tab or start a workout, the
exercise that opens slides in, a ticked set pops with a short vibration (on
phones that support it), and in the active workout you swipe left / right on the
open exercise to move to the next / previous one. Tapped rows and buttons give a
small press feedback. Everything is off when the phone asks for reduced motion.

Progression coach (v17): instead of a "too easy" flag, the app reads the last
session of each exercise and decides — double progression: every working set at
the top of the rep range → go up one step (2 kg dumbbells, 2.5 kg bars and
machines; two steps if every set beat the top by 3+); the first set, or two
sets, under the bottom of the range → one step down; only the last set under →
normal fatigue, stay; three sessions at the same weight without more reps
(counting the same exercise on other days) → one step down and work back up to
the top of the range; sets at mixed weights → do them all at the heaviest; a
break of 3+ weeks → ease back in one step lower; otherwise stay and beat last
time by a rep per set. The suggested weight and rep targets are pre-filled in
the set table (the Previous column keeps last time's numbers), a line above
the table says why, and Today shows each target with ↑ / ↓.

v18 training tools:
- **Reps in reserve** — after each ticked set, tap how many reps were left
  (0 · 1 · 2 · 3+; aim 1–2 on heavy compounds, 0–1 on isolation). The coach
  uses it: top of the range with ~3 left → two steps up; 3+ left without
  reaching the top → push closer before anything else; a plateau with reps in
  reserve → push harder before dropping the weight. After the last set the card
  waits for the answer, then opens the next exercise. Can be turned off in
  Settings.
- **Exercise notes** — seat height, grip, machine settings, cues; edited from
  the ⋯ sheet or the Routine editor, shown under the exercise while you train.
  Alternatives have their own notes.
- **Plate calculator** — barbell exercises show the plates per side for the
  next set (20 kg bar, 10 kg EZ bar), updating as you change the weight.
- **Deload week** — Today suggests one when 3+ exercises have plateaued or the
  training cycle is in its last week (not again within 4 weeks). Starting it
  gives 7 days of ~15% lighter suggestions with 3+ reps left.

v19 body and weekly view:
- **Measurements** — Progress → Body: bodyweight, waist, shoulders, chest,
  arm and thigh (with how to measure each), a trend chart per measure and the
  shoulders / waist ratio ("V-taper"). Tap a row to edit or delete it.
- **Progress photos** — front / side / back, resized on the phone and kept in
  its IndexedDB only (not synced, not in backups). The first and latest photo
  of a pose are shown side by side; tap a thumbnail to pick another "before".
- **Muscle map** — Overview shows front and back silhouettes coloured by the
  sets done this week against the plan.
- **Protein** — a card on Today with +20 / +30 / +40 and −10 (tap the number to
  type it). The goal is 1.8 g per kg of the latest bodyweight, or a fixed value
  set in Settings.
- **Weekly report** — on Overview: workouts and sets, new est. 1RM records,
  muscles below plan (or still to do, for the current week), bodyweight and
  protein, and which exercises the coach moves up or down next time. Shown for
  last week, or the current one on Sundays (or when last week had no workouts).
  The backup / synced `data.json` also carries `body` and the last six weekly
  `reports`.

The details below describe the features, which are unchanged.

## What it does

- **Multi-day routine** — editable from inside the app: add, rename, reorder or
  delete exercises and days without touching the code.
- **Several saved routines** — e.g. a specialisation block and the plan that
  follows it. Start one from a template (Aesthetic: upper/lower twice a week
  plus a delts & arms day; Shoulder specialization; Standard, the same plan
  without the extra shoulder work; or Lunch, built to fit a 1-hour break) or
  duplicate an existing one; exercises you keep share their history with the
  original. Reset brings a routine back to the template it started from. Each
  day shows an estimated session length.
- **Supersets** — give two exercises the same letter and they're done
  alternately: ticking one opens its partner without a rest, and the rest
  timer starts only after the round.
- **Training cycle** — set a start date and length per routine and the header
  shows "Week 3 / 6", turning red once the planned block is over.
- **Priority exercises** — flag the lifts that matter most in the block; they
  are highlighted in the workout view.
- **Sets per muscle** — each exercise has a target muscle, and the Data view
  shows sets logged since Monday against the weekly plan.
- **Per-set logging** — tick ✓ after each set: the row turns green, the rest
  timer starts on its own, and the exercise is saved once the last set is
  ticked, then the next exercise opens. Inputs are pre-filled from your last
  session; "Log all sets at once" is still there. −/+ buttons next to each
  field adjust the weight (2.5 kg, or 2 kg for dumbbells) and the reps (±1),
  starting from the previous set when the field is empty.
- **Progress header** — the day tabs stay pinned at the top while you scroll,
  with a progress bar, "Exercise 2 / 5 · 6 / 16 sets" and the session time.
  Once the day is done, tapping it reopens the summary.
- **Progression** — delta against the previous session, a sparkline of the last
  8 sessions, a line chart per exercise (est. 1RM, or reps for bodyweight
  moves; tap a point to jump to that session), and an automatic nudge when you
  hit the top of the rep range on every set (or when you tick "too easy").
- **Records** — best weight, estimated 1RM (Epley formula) and session volume,
  with a `PR` badge. Beating a record mid-workout pops a banner with confetti.
- **Workout summary** — when every exercise of the day is done: duration, sets,
  volume, PRs and the change versus the last time you trained that day.
- **Warm-up & cool-down** — a pre-workout checklist at the top of the day
  (upper or lower variant) and a cool-down checklist once every set is done;
  both show up in the summary and are included in the backup.
- **Warm-up sets** — type the set 1 weight and the first exercise for each
  muscle suggests ramp-up sets (e.g. 60 kg → 25×10, 35×5, 47.5×3), rounded to
  the plates or dumbbells available. They aren't logged, so charts and PRs
  stay clean.
- **Consistency** — a calendar of gym days over the last 17 weeks, with the
  current and best run of full weeks. Tap any gym day to reopen its workout summary.
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
- **Alternatives (v13)** — each exercise can list equivalent alternatives, each
  with its own sets, reps, rest and history (Routine → "+ Alternative"). On the
  workout screen, tap the exercise name (▾) to open a menu with the planned
  exercise and its alternatives, with their last session, and pick one for
  today; once a set is logged the choice is locked for the day. Recaps, weekly
  sets and strength stats pick up whichever one was done. A session logged on
  the wrong one can be moved from its history ("Move…"). The Aesthetic template
  puts free weights and cables first, with machine versions among the
  alternatives.
- **Redesigned workout screen (v14)** — inspired by Dribbble gym-app concepts
  (BetterFit, Gym Workout App, Hypertrofit). Today's list: a Monday–Sunday week
  strip (done days, what's next in the rotation, rest days — set them in
  Routine → Rest days; tap a past day for its recap, a future one to switch to
  it), a "today" card with a sets ring and Start / Continue, and compact rows
  with an equipment icon (barbell, dumbbell, cable, machine, bodyweight) and ⇄
  to substitute. Tapping a row opens the exercise full screen: big title, last /
  best e1RM / tip, sets as large pill rows, previous/next exercise; finishing an
  exercise moves on to the next one, supersets alternate on their own. The rest
  bar is restyled with Skip.
- **GitHub sync (v12)** — optional. Data → GitHub sync: enter a private repo
  (`owner/name`) and a fine-grained token with *Contents: read and write* on that
  repo only. The full backup is written to `data.json` in that repo after every
  finished workout, when you leave or reopen the app with unsaved changes, and
  with "Sync now". The token stays in this browser and is never part of a backup.

## Where the data lives

All in `localStorage`, in that one browser. Without GitHub sync there is no
server and no sync between devices.

Which means **if you switch phone or the browser clears its storage, the data is
gone** unless GitHub sync is on: otherwise every so often use Data → "Download .json backup".
To restore from GitHub, download `data.json` from the repo and import it.

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
