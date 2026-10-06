const labs = [
  {
    id: "view",
    index: "01",
    name: "View timeline",
    code: "view()",
    kicker: "Instead of ScrollTrigger",
    title: "Reveal as it enters",
    blurb:
      "A motion library would watch the scroll position and toggle a class. view() ties the fade and rise to the moment the card enters the screen.",
    support: () => CSS.supports("animation-timeline", "view()"),
    unsupported: "This browser does not support view() yet, so the cards will sit still.",
    baseCss: `
      html, body { margin: 0; background: #f8fafc; color: #0f172a; font-family: Outfit, sans-serif; }
      .hint { position: sticky; top: 0; margin: 0; padding: 20px 28px; background: #f8fafc; color: #334155; font-family: "IBM Plex Mono", monospace; font-size: 32px; letter-spacing: 0.06em; text-transform: uppercase; }
      .card { width: min(760px, calc(100% - 48px)); margin: 70vh auto; padding: 48px; border-radius: 28px; background: white; border: 1px solid #e2e8f0; }
      .card h2 { margin: 0 0 12px; font-size: 72px; }
      .card p { margin: 0; color: #475569; font-size: 40px; line-height: 1.3; }
      .end { height: 40vh; }
    `,
    css: `.card {
  animation: reveal auto linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(72px) scale(0.92); }
  to { opacity: 1; transform: none; }
}`,
    html: () => `
      <p class="hint">Scroll</p>
      <article class="card"><h2>One</h2><p>The timeline starts as this card enters.</p></article>
      <article class="card"><h2>Two</h2><p>Each card carries its own view timeline.</p></article>
      <article class="card"><h2>Three</h2><p>Scroll back and the entrance reverses.</p></article>
      <div class="end"></div>
    `,
  },
  {
    id: "scroll",
    index: "02",
    name: "Scroll timeline",
    code: "scroll()",
    kicker: "Instead of a scroll listener",
    title: "Progress follows the scrollbar",
    blurb:
      "scroll() drives the bar from the top of the page to the bottom. Nothing in JavaScript measures the scrollbar.",
    support: () => CSS.supports("animation-timeline", "scroll(root)"),
    unsupported: "This browser does not support animation-timeline yet, so the bar will not track the scroll.",
    baseCss: `
      html, body { margin: 0; background: #f8fafc; color: #0f172a; font-family: Outfit, sans-serif; }
      .track { position: sticky; top: 0; z-index: 2; background: #f8fafc; padding: 10px 0 8px; }
      .rail { height: 18px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
      .bar { height: 100%; width: 100%; background: #7c3aed; }
      section { padding: 72px 40px 120px; max-width: 820px; }
      h2 { font-size: 72px; margin: 0 0 16px; }
      p { font-size: 40px; line-height: 1.35; color: #475569; }
      code { font-family: "IBM Plex Mono", monospace; font-size: 0.9em; }
    `,
    css: `.bar {
  transform-origin: left center;
  animation: grow auto linear both;
  animation-timeline: scroll(root);
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}`,
    html: () => `
      <div class="track"><div class="rail"><div class="bar"></div></div></div>
      <section>
        <h2>The whole scroll</h2>
        <p>From is the top. To is the bottom. Scroll back up and the bar reverses with you.</p>
      </section>
      <section>
        <h2>Not a clock</h2>
        <p>Swap <code>scroll(root)</code> for <code>auto</code> and the bar stops tracking position.</p>
      </section>
      <section>
        <h2>Keep going</h2>
        <p>view() follows an element. scroll() follows the scroller.</p>
      </section>
    `,
  },
  {
    id: "menu",
    index: "03",
    name: "Enter and exit",
    code: "allow-discrete",
    kicker: "Instead of mount and unmount",
    title: "Fade closed, fade open",
    blurb:
      "A library animates the menu, then removes it. allow-discrete lets the fade finish before display: none. @starting-style fades it back in. The pill stays put.",
    support: () => CSS.supports("transition-behavior", "allow-discrete"),
    unsupported: "This browser does not support discrete transitions yet, so the menu will snap.",
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #f8fafc; font-family: Outfit, sans-serif; font-size: 40px; }
      .wrap { width: min(520px, calc(100% - 32px)); display: grid; gap: 16px; }
      button { grid-area: 1 / 1; width: 100%; border: 0; background: #0f172a; color: white; font: inherit; font-weight: 700; padding: 16px 22px; border-radius: 999px; cursor: pointer; }
      .menu, .slot { grid-area: 2 / 1; margin: 0; padding: 10px; list-style: none; border-radius: 16px; border: 1px solid #e2e8f0; }
      .menu { background: white; }
      .slot { visibility: hidden; }
      li { padding: 14px 16px; border-radius: 10px; }
    `,
    css: `.menu {
  opacity: 1;
  transition-property: opacity, display;
  transition-duration: 400ms;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;
}

.menu.closed {
  opacity: 0;
  display: none;
}

@starting-style {
  .menu {
    opacity: 0;
  }
}`,
    html: () => `
      <div class="wrap">
        <button type="button">Toggle menu</button>
        <ul class="menu">
          <li>Profile</li>
          <li>Settings</li>
          <li>Sign out</li>
        </ul>
        <ul class="slot" aria-hidden="true">
          <li>Profile</li>
          <li>Settings</li>
          <li>Sign out</li>
        </ul>
      </div>
      <script>
        const menu = document.querySelector(".menu");
        document.querySelector("button").addEventListener("click", () => {
          menu.classList.toggle("closed");
        });
      </script>
    `,
  },
  {
    id: "height",
    index: "04",
    name: "Height auto",
    code: "interpolate-size",
    kicker: "Instead of measuring height",
    title: "Open to height: auto",
    blurb:
      "JavaScript reads the content height, then animates to that number. interpolate-size transitions straight to height: auto. Show this one in Chrome.",
    support: () => CSS.supports("interpolate-size", "allow-keywords"),
    unsupported: "This browser cannot transition to height: auto yet, so the panel will snap open.",
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #ffffff; color: #0f172a; font-family: Outfit, sans-serif; font-size: 40px; }
      .item { width: min(760px, calc(100% - 32px)); border: 1px solid #e2e8f0; border-radius: 18px; overflow: hidden; }
      button { width: 100%; text-align: left; border: 0; background: #f8fafc; font: inherit; font-weight: 700; padding: 20px 24px; cursor: pointer; }
      .panel p { margin: 0; padding: 0 24px 22px; color: #475569; line-height: 1.4; }
    `,
    css: `:root {
  interpolate-size: allow-keywords;
}

.panel {
  height: 0;
  overflow: clip;
  transition: height 500ms ease-out;
}

.item.open .panel {
  height: auto;
}`,
    html: () => `
      <div class="item">
        <button type="button">Notes</button>
        <div class="panel"><p>The height is auto. This copy can wrap onto as many lines as it needs, and the panel still eases open and closed.</p></div>
      </div>
      <script>
        const item = document.querySelector(".item");
        document.querySelector("button").addEventListener("click", () => {
          item.classList.toggle("open");
        });
      </script>
    `,
  },
  {
    id: "bounce",
    index: "05",
    name: "Bounce",
    code: "linear()",
    kicker: "Instead of a spring helper",
    title: "A curve written as points",
    blurb:
      "linear() writes the overshoot into the easing. A simple bounce does not need a physics function from a library.",
    support: () => CSS.supports("animation-timing-function", "linear(0, 1)"),
    unsupported: "This browser does not support the linear() easing function.",
    tools: (_lab, api) => [{ label: "Replay", onClick: () => api.render() }],
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #f8fafc; font-family: Outfit, sans-serif; font-size: 32px; }
      .stage { height: 280px; display: grid; align-items: end; justify-items: center; }
      .ball { width: 84px; height: 84px; border-radius: 50%; background: #7c3aed; }
      .floor { width: 180px; height: 4px; border-radius: 999px; background: #e2e8f0; margin-top: 8px; }
    `,
    css: `.ball {
  animation: drop 1.1s linear(0, 0.05 8%, 1.28 42%, 0.82 62%, 1.08 80%, 1) both;
}

@keyframes drop {
  from { transform: translateY(-180px) scale(0.85, 1.08); }
  to { transform: translateY(0) scale(1); }
}`,
    html: () => `
      <div>
        <div class="stage"><div class="ball"></div></div>
        <div class="floor"></div>
      </div>
    `,
  },
];

const list = document.querySelector("#lab-list");
const stage = document.querySelector("#stage");
const cssInput = document.querySelector("#css");
const title = document.querySelector("#title");
const kicker = document.querySelector("#kicker");
const blurb = document.querySelector("#blurb");
const support = document.querySelector("#support");
const tools = document.querySelector("#tools");
const reset = document.querySelector("#reset");

let current = labs[0];

function storageKey(lab) {
  return `melb-css:${lab.id}`;
}

function readCss(lab) {
  return sessionStorage.getItem(storageKey(lab)) ?? lab.css;
}

function writeCss(lab, value) {
  sessionStorage.setItem(storageKey(lab), value);
}

function previewDocument(lab, css) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Outfit:wght@500;700&display=swap">
<style>
  * { box-sizing: border-box; }
  ${lab.baseCss}
  ${css}
</style>
</head>
<body>
${lab.html(lab)}
</body>
</html>`;
}

const api = {
  getCss: () => cssInput.value,
  setCss: (value) => {
    cssInput.value = value;
    applyCss();
  },
  render: () => applyCss(),
};

function applyCss() {
  const css = cssInput.value;
  writeCss(current, css);
  stage.srcdoc = previewDocument(current, css);
}

function renderTools(lab) {
  tools.replaceChildren();
  (lab.tools ? lab.tools(lab, api) : []).forEach((tool) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = tool.label;
    button.addEventListener("click", tool.onClick);
    tools.append(button);
  });
}

function selectLab(lab) {
  current = lab;
  title.textContent = lab.title;
  kicker.textContent = lab.kicker;
  blurb.textContent = lab.blurb;
  cssInput.value = readCss(lab);
  const ok = lab.support();
  support.hidden = ok;
  support.textContent = ok ? "" : lab.unsupported;
  for (const button of list.querySelectorAll(".lab-btn")) {
    if (button.dataset.id === lab.id) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  }
  renderTools(lab);
  applyCss();
}

labs.forEach((lab) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "lab-btn";
  button.dataset.id = lab.id;
  button.innerHTML = `<span class="index">${lab.index}</span><span><strong></strong><span></span></span>`;
  button.querySelector("strong").textContent = lab.name;
  button.querySelector("span span").textContent = lab.code;
  button.addEventListener("click", () => selectLab(lab));
  list.append(button);
});

reset.addEventListener("click", () => {
  sessionStorage.removeItem(storageKey(current));
  cssInput.value = current.css;
  applyCss();
});

cssInput.addEventListener("input", applyCss);

cssInput.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const start = cssInput.selectionStart;
  const end = cssInput.selectionEnd;
  cssInput.value = `${cssInput.value.slice(0, start)}  ${cssInput.value.slice(end)}`;
  cssInput.selectionStart = cssInput.selectionEnd = start + 2;
  applyCss();
});

selectLab(current);
