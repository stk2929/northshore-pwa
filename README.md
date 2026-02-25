# North Shore Kids — PWA Setup

## What's in this folder
- `index.html` — The complete app (React + all data + styles)
- `manifest.json` — PWA config (app name, icon, theme)
- `sw.js` — Service worker for offline support
- `icon-192.png` / `icon-512.png` — Home screen icons

## Deploy in 60 seconds (free)

### Option A: Netlify (drag & drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `northshore-pwa` folder onto the page
3. Done! You'll get a URL like `random-name.netlify.app`
4. (Optional) Click "Site settings" → "Change site name" to pick a custom name

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com) and sign up free
2. Install Vercel CLI: `npm i -g vercel`
3. In terminal, `cd` into this folder and run `vercel`
4. Follow prompts — done!

### Option C: GitHub Pages
1. Create a new GitHub repo
2. Upload all files to the repo
3. Go to Settings → Pages → Source: main branch
4. Your app will be at `yourusername.github.io/repo-name`

## Install on iPhone

1. Open your deployed URL in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "NS Kids" and tap **Add**
5. The app icon appears on your home screen!

It now launches full-screen like a native app — no Safari toolbar,
and your saved favorites persist between sessions.

## What works
- ✅ Full-screen standalone mode (no browser chrome)
- ✅ iOS safe areas (notch, home indicator)
- ✅ Swipe between days
- ✅ Saved favorites persist (localStorage)
- ✅ Native Share sheet integration
- ✅ "Open in Maps" for event locations
- ✅ Offline support (service worker cache)
- ✅ Home screen icon

## Customization
- Edit events directly in `index.html` (search for `BASE_RECURRING`)
- Change the color palette by editing the `P` object at the top
- Swap icons by replacing the PNG files
