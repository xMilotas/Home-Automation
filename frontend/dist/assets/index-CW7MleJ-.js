(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={light:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path
        d="M12 2a7 7 0 0 0-4 12c1 1 2 3 2 4h4c0-1 1-3 2-4a7 7 0 0 0-4-12Z"
      />
    </svg>
  `,bedroom:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 10v11" />
      <path d="M21 10v11" />
      <path d="M3 18h18" />
      <path d="M5 10h14a2 2 0 0 1 2 2v6H3v-6a2 2 0 0 1 2-2Z" />
      <path d="M7 10V7h4v3" />
    </svg>
  `,power:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2v10" />
      <path
        d="M18.4 5.6a9 9 0 1 1-12.8 0"
      />
    </svg>
  `,timer:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13 15 16" />
      <path d="M9 2h6" />
    </svg>
  `,moon:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
      />
    </svg>
  `};async function t(e,t,n){try{return await fetch(`/api/PowerPlugs`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({outletID:e,outletStatus:t,timer:n??!1})}),!0}catch(e){return console.error(e),!1}}var n=[{id:1,name:`Wohnzimmer groß`,icon:e.light},{id:2,name:`Wohnzimmer klein`,icon:e.light},{id:3,name:`Schlafzimmer`,icon:e.bedroom},{id:4,name:`Schlitten`,icon:e.power}],r=document.querySelector(`#app`);if(!r)throw Error(`App container not found`);async function i(e,n,r){await t(e,n,r)?l(`Befehl gesendet`):l(`Fehler beim Senden`)}function a(t){return`
    <article class="outlet-card">
      <div class="outlet-header">
      <div class="outlet-icon">
        ${t.icon}
      </div>

        <div class="outlet-title-group">
          <h2 class="outlet-title">
            ${t.name}
          </h2>
        </div>
      </div>

      <div class="outlet-actions">
        <button
          class="action-button action-on"
          data-id="${t.id}"
          data-status="1"
        >
          EIN
        </button>

        <button
          class="action-button action-off"
          data-id="${t.id}"
          data-status="0"
        >
          AUS
        </button>

        <button
          class="action-button timer-button"
          data-timer="${t.id}"
        >
          ${e.timer}
        </button>
      </div>
    </article>
  `}r.innerHTML=`
  <main class="app-shell">
    <header class="topbar">
      <h1>Steckdosen</h1>
    </header>

    <section class="outlet-grid">
      ${n.map(a).join(``)}
    </section>

    <section class="scene-section">
      <div class="scene-card">
        <div class="scene-copy">
          <span class="scene-label">
            Szene
          </span>

          <h2>
            <span class="scene-icon">
              ${e.moon}
            </span>

            Gute Nacht
          </h2>

          <p>
            Alle Steckdosen ausschalten
          </p>
        </div>

        <button
          class="scene-button"
          id="good-night-button"
        >
          Aktivieren
        </button>
      </div>
    </section>

    <div class="toast" id="toast">
      Befehl gesendet
    </div>

    <div class="timer-sheet hidden" id="timer-sheet">
      <div class="timer-sheet-backdrop"></div>

      <div class="timer-sheet-content">
        <div class="sheet-handle"></div>

        <div class="timer-sheet-header">
          <div>
            <span class="sheet-label">
              Timer
            </span>

            <h3 id="timer-title">
              Steckdose
            </h3>
          </div>

          <button id="close-timer">
            ✕
          </button>
        </div>

        <div class="timer-options">
          <button class="timer-option" data-minutes="5">
            <span>5 Minuten</span>
            <small>Schnellwahl</small>
          </button>

          <button class="timer-option" data-minutes="10">
            <span>10 Minuten</span>
            <small>Schnellwahl</small>
          </button>

          <button class="timer-option" data-minutes="15">
            <span>15 Minuten</span>
            <small>Schnellwahl</small>
          </button>

          <button class="timer-option" data-minutes="30">
            <span>30 Minuten</span>
            <small>Schnellwahl</small>
          </button>
        </div>

        <div class="custom-timer">
          <label for="custom-minutes">
            Benutzerdefiniert
          </label>

          <div class="custom-timer-row">
            <input
              id="custom-minutes"
              type="number"
              min="1"
              max="240"
              value="45"
            />

            <button id="start-custom-timer">
              Starten
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
`,document.querySelectorAll(`[data-status]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=Number(e.dataset.id),n=Number(e.dataset.status);e.disabled=!0,await i(t,n),setTimeout(()=>{e.disabled=!1},500)})}),document.querySelector(`#good-night-button`)?.addEventListener(`click`,async()=>{i(6,0)});var o=document.querySelector(`#timer-sheet`),s=null;document.querySelectorAll(`[data-timer]`).forEach(e=>{e.addEventListener(`click`,()=>{s=Number(e.dataset.timer);let t=n.find(e=>e.id===s),r=document.querySelector(`#timer-title`);r&&t&&(r.textContent=t.name),o?.classList.remove(`hidden`),requestAnimationFrame(()=>{o?.classList.add(`timer-sheet-visible`)})})});function c(){o?.classList.remove(`timer-sheet-visible`),setTimeout(()=>{o?.classList.add(`hidden`)},220)}document.querySelector(`#close-timer`)?.addEventListener(`click`,c),document.querySelector(`.timer-sheet-backdrop`)?.addEventListener(`click`,c),document.querySelectorAll(`.timer-option`).forEach(e=>{e.addEventListener(`click`,()=>{if(!s)return;let t=Number(e.dataset.minutes);i(s,1,t),c()})}),document.querySelector(`#start-custom-timer`)?.addEventListener(`click`,()=>{if(!s)return;let e=document.querySelector(`#custom-minutes`),t=Number(e?.value);if(!t||t<1){l(`Ungültiger Timer`);return}i(s,1,t),c()});function l(e){let t=document.querySelector(`#toast`);t&&(t.textContent=e,t.classList.add(`toast-visible`),setTimeout(()=>{t.classList.remove(`toast-visible`)},2e3))}