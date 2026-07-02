# Gaiwan Ritual Assets Needed

Add these dedicated cinematic step images:

- `gaiwan-step-1-warm-bowl.jpg`
- `gaiwan-step-2-add-leaves.jpg`
- `gaiwan-step-3-wake-tea.jpg`
- `gaiwan-step-4-brew.jpg`
- `gaiwan-step-5-pour.jpg`
- `gaiwan-step-6-taste.jpg`

Still missing media:

- `public/audio/tea-pour.mp3`
- `public/video/gaiwan-ritual.mp4`

The site now resolves these through `src/lib/media.ts`, including the GitHub Pages `/chazen-website` base path. Drop final exports into `public/audio/` and `public/video/` using the exact filenames above.
