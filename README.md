# Gym log — install as an app

This folder is a small web app. Hosted anywhere, it installs to your phone's
home screen and opens full-screen like a native app. Free hosting via GitHub
Pages, about 5 minutes:

1. Go to github.com and log in (or create a free account).
2. Click the "+" in the top right, then "New repository". Name it
   `gym-log`, keep it public, click "Create repository".
3. On the new repo page, click "uploading an existing file" (or
   Add file → Upload files).
4. Drag in all 5 files from this folder: `index.html`, `manifest.json`,
   `service-worker.js`, `icon-192.png`, `icon-512.png`. Commit.
5. Go to Settings → Pages (left sidebar). Under "Build and deployment",
   set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
   Save.
6. Wait about a minute, then your app is live at:
   `https://<your-github-username>.github.io/gym-log/`

On your phone:
- **Android (Chrome)**: open that link, tap the ⋮ menu, "Add to Home
  screen" / "Install app".
- **iPhone (Safari)**: open the link, tap the Share icon, "Add to Home
  Screen".

Either way you get an app icon that opens full-screen, no browser bar.
Your logged weights are saved on that phone only (not synced between
devices) — the app works offline after the first load.
