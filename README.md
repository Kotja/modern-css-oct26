# Next-Gen CSS Animations

A 15-minute talk and live playground for Melbourne CSS Meetup 2026. Five jobs that used to need a motion library, each one now a CSS declaration.

The motion lives in CSS. The page does not run a library on every frame.

## What’s in here

- **[index.html](index.html)** — the playground. Pick a lab, edit the CSS, and the preview updates as you type. Edits stay in `sessionStorage` until you hit Reset.
- **[slides.html](slides.html)** — the slide deck (Reveal.js). Speaker notes are on each slide; press `S` to open them.

## The five labs

| Lab | CSS | Replaces |
| --- | --- | --- |
| 01 View timeline | `animation-timeline: view()` | ScrollTrigger / enter-on-scroll |
| 02 Scroll timeline | `animation-timeline: scroll(root)` | A scroll listener measuring the scrollbar |
| 03 Enter and exit | `transition-behavior: allow-discrete` and `@starting-style` | Animate, then mount or unmount |
| 04 Height auto | `interpolate-size: allow-keywords` | Reading content height in JavaScript |
| 05 Bounce | `linear()` easing | A spring helper |

`view()` follows an element as it enters. `scroll()` follows the scroller. Lab 04 (`interpolate-size`) is not in every browser yet — show that one in Chrome.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

Then open the playground and the deck at `slides.html`.

Live: [kotja.github.io/modern-css-oct26](https://kotja.github.io/modern-css-oct26/?v=4)
