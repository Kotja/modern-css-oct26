const labs = [
  {
    id: "scroll",
    index: "01",
    name: "Scroll timeline",
    code: "animation-timeline",
    kicker: "Native logic",
    title: "Scroll-driven animations",
    blurb:
      "The bar is tied to the preview’s scroll position. Change the timeline, the origin, or the keyframes and scroll again.",
    support: () => CSS.supports("animation-timeline", "scroll(root)"),
    unsupported:
      "This browser does not support animation-timeline yet, so the bar will not track the scroll.",
    baseCss: `
      html, body { margin: 0; background: #f8fafc; color: #0f172a; font-family: Outfit, sans-serif; }
      .track { position: sticky; top: 0; z-index: 2; background: #f8fafc; padding: 10px 0 8px; }
      .rail { height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
      .bar { height: 100%; width: 100%; background: #7c3aed; }
      section { padding: 72px 40px 120px; max-width: 640px; }
      h2 { font-size: 32px; margin: 0 0 12px; }
      p { font-size: 18px; line-height: 1.5; color: #475569; }
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
        <h2>No scroll listener</h2>
        <p>The fill is an animation. The timeline is the document scroll, so the main thread never has to measure the scrollbar.</p>
      </section>
      <section>
        <h2>Try breaking it</h2>
        <p>Swap <code>scroll(root)</code> for <code>auto</code>, or change <code>transform-origin</code> to <code>right center</code>.</p>
      </section>
      <section>
        <h2>Keep going</h2>
        <p>The range of the timeline is the full scroll distance. From is the top. To is the bottom.</p>
      </section>
      <section>
        <h2>Melbourne CSS</h2>
        <p>Scroll back up. The bar should reverse with you, because the animation is linked to position, not to time.</p>
      </section>
    `,
  },
  {
    id: "sibling",
    index: "02",
    name: "sibling-index()",
    code: "sibling-index()",
    kicker: "Native logic",
    title: "Dynamic animation staggering",
    blurb:
      "Each card delays itself from its position in the tree. Add a card and the new one picks up the next delay without any JavaScript index.",
    support: () => CSS.supports("animation-delay", "calc(sibling-index() * 1ms)"),
    unsupported:
      "This browser does not support sibling-index() yet, so every card will start together.",
    state: { count: 4 },
    tools: (lab, api) => [
      {
        label: "Add card",
        onClick: () => {
          lab.state.count = Math.min(8, lab.state.count + 1);
          api.render();
        },
      },
      {
        label: "Replay",
        onClick: () => api.render(),
      },
    ],
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #ffffff; font-family: Outfit, sans-serif; }
      ul { list-style: none; margin: 0; padding: 28px; display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; align-items: end; }
      li { width: 72px; border-radius: 16px; background: #7c3aed; color: white; display: grid; place-items: end center; padding: 10px; font-family: "IBM Plex Mono", monospace; }
    `,
    css: `li {
  height: calc(70px + sibling-index() * 28px);
  animation: rise 700ms both;
  animation-delay: calc(sibling-index() * 80ms);
}

@keyframes rise {
  from { opacity: 0; translate: 0 18px; }
  to { opacity: 1; translate: 0 0; }
}`,
    html: (lab) => `
      <ul>
        ${Array.from({ length: lab.state.count }, (_, i) => `<li>${i + 1}</li>`).join("")}
      </ul>
    `,
  },
  {
    id: "contrast",
    index: "03",
    name: "contrast-color()",
    code: "contrast-color()",
    kicker: "Native logic",
    title: "The contrast-color() function",
    blurb:
      "The type colour is chosen by the browser from the background. Pick a new colour, or type one into --bg. The @supports block is the feature. Without contrast-color(), the text stays white.",
    support: () => CSS.supports("color", "contrast-color(red)"),
    unsupported:
      "This browser does not support contrast-color() yet, so the text stays on the fallback colour.",
    tools: (lab, api) => [
      {
        html: `<label>Background <input id="bg-color" type="color" value="#7c3aed" aria-label="Background colour"></label>`,
        bind: (root) => {
          const input = root.querySelector("#bg-color");
          const currentBg = api.getCss().match(/--bg:\s*(#[0-9a-fA-F]{3,8})/);
          if (currentBg) input.value = currentBg[1];
          input.addEventListener("input", (event) => {
            const next = event.target.value;
            const css = api.getCss().replace(/(--bg:\s*)[^;]+/, `$1${next}`);
            api.setCss(css);
          });
        },
      },
    ],
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #f8fafc; font-family: Outfit, sans-serif; }
      .card { width: min(460px, calc(100vw - 48px)); min-height: 220px; border-radius: 28px; display: grid; place-items: center; text-align: center; padding: 32px; }
      h2 { margin: 0 0 8px; font-size: 40px; letter-spacing: -0.04em; }
      p { margin: 0; font-size: 16px; }
    `,
    css: `:root {
  --bg: #7c3aed;
}

.card {
  background: var(--bg);
  color: #ffffff;
}

@supports (color: contrast-color(red)) {
  .card {
    color: contrast-color(var(--bg));
  }
}`,
    html: () => `
      <div class="card">
        <div>
          <h2>Aa</h2>
          <p>Automatic high contrast</p>
        </div>
      </div>
    `,
  },
  {
    id: "subgrid",
    index: "04",
    name: "Subgrid",
    code: "subgrid",
    kicker: "Modern layouts",
    title: "Perfect alignment with subgrid",
    blurb:
      "Both cards share the parent’s rows, so the titles, text, and actions line up. Remove grid-row and subgrid from the CSS to let each card size itself.",
    support: () => CSS.supports("grid-template-rows", "subgrid"),
    unsupported: "This browser does not support subgrid yet, so the rows will not lock together.",
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #ffffff; color: #0f172a; font-family: Outfit, sans-serif; }
      .grid { width: min(680px, calc(100% - 40px)); display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto auto; column-gap: 18px; row-gap: 12px; align-items: start; }
      article { border: 2px solid #ddd6fe; border-radius: 18px; background: #f8fafc; padding: 16px; }
      h3 { margin: 0; font-size: 22px; }
      p { margin: 0; color: #475569; line-height: 1.45; }
      a { color: #7c3aed; font-weight: 700; text-decoration: none; }
    `,
    css: `article {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}`,
    html: () => `
      <div class="grid">
        <article>
          <h3>Short title</h3>
          <p>One quiet sentence.</p>
          <a href="#">Read</a>
        </article>
        <article>
          <h3>A title long enough to wrap onto a second line</h3>
          <p>More copy lives here, so a normal stack would push this action further down the card.</p>
          <a href="#">Read</a>
        </article>
      </div>
    `,
  },
  {
    id: "layers",
    index: "05",
    name: "Cascade layers",
    code: "@layer",
    kicker: "Architecture",
    title: "Organising with cascade layers",
    blurb:
      "Three rules target the same button. The last name in the @layer list wins, not the last rule in the file. Move reset to the end of that list and the gray square takes over.",
    support: () => typeof CSSLayerBlockRule === "function",
    unsupported: "This browser does not support cascade layers.",
    baseCss: `
      html, body { height: 100%; }
      body { margin: 0; display: grid; place-items: center; background: #f8fafc; font-family: Outfit, sans-serif; }
      .btn { border: 0; font: inherit; font-weight: 700; font-size: 18px; padding: 16px 22px; cursor: pointer; }
    `,
    css: `/* The last name in this list wins. */
@layer reset, components, utilities;

@layer reset {
  .btn {
    background: #e2e8f0;
    color: #0f172a;
    border-radius: 0;
  }
}

@layer components {
  .btn {
    background: #7c3aed;
    color: white;
    border-radius: 999px;
  }
}

@layer utilities {
  .btn {
    background: #0f172a;
    color: #c4b5fd;
    border-radius: 12px;
  }
}`,
    html: () => `<button class="btn" type="button">Save changes</button>`,
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
    if (tool.html) {
      const wrap = document.createElement("div");
      wrap.innerHTML = tool.html;
      tools.append(wrap);
      tool.bind(wrap);
      return;
    }
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
  if (current.state) current.state.count = 4;
  cssInput.value = current.css;
  const color = tools.querySelector("#bg-color");
  if (color) color.value = "#7c3aed";
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
