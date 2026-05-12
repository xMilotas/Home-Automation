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
  `,desk:`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- tabletop -->
      <rect
        x="3"
        y="6"
        width="18"
        height="4"
        rx="1.2"
      />

      <!-- left leg -->
      <path d="M6 10v8" />

      <!-- right leg -->
      <path d="M18 10v8" />

      <!-- support -->
      <path d="M6 14h12" />

      <!-- drawer -->
      <rect
        x="9"
        y="10"
        width="6"
        height="3"
        rx="0.8"
      />
    </svg>
  `},t=[{id:1,name:`Wohnzimmer groß`,icon:e.light},{id:2,name:`Wohnzimmer klein`,icon:e.light},{id:3,name:`Schlafzimmer`,icon:e.bedroom},{id:4,name:`Schreibtisch`,icon:e.desk}];async function n(e,t,n){try{return await fetch(`/api/PowerPlugs`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({outletID:e,outletStatus:t,timer:n??!1})}),!0}catch(e){return console.error(e),!1}}function r(e){let t=document.querySelector(`#toast`);t&&(t.textContent=e,t.classList.add(`toast-visible`),setTimeout(()=>{t.classList.remove(`toast-visible`)},2e3))}async function i(e,t,i){let a=await n(e,t,i);return r(a?`Befehl gesendet`:`Fehler beim Senden`),a}var a=null;function o(){return{timerSheet:document.querySelector(`#timer-sheet`),title:document.querySelector(`#timer-title`),input:document.querySelector(`#custom-minutes`)}}function s(e){let{timerSheet:n,title:r}=o();a=e;let i=t.find(t=>t.id===e);r&&i&&(r.textContent=i.name),n?.classList.remove(`hidden`),requestAnimationFrame(()=>{n?.classList.add(`timer-sheet-visible`)})}function c(){let{timerSheet:e}=o();e?.classList.remove(`timer-sheet-visible`),setTimeout(()=>{e?.classList.add(`hidden`)},220)}function l(){document.querySelector(`#close-timer`)?.addEventListener(`click`,c),document.querySelector(`.timer-sheet-backdrop`)?.addEventListener(`click`,c),document.querySelectorAll(`.timer-option`).forEach(e=>{e.addEventListener(`click`,async()=>{if(!a)return;let t=Number(e.dataset.minutes);await i(a,1,t),c()})}),document.querySelector(`#start-custom-timer`)?.addEventListener(`click`,async()=>{if(!a)return;let{input:e}=o(),t=Number(e?.value);if(!t||t<1){r(`Ungültiger Timer`);return}await i(a,1,t),c()})}function u(){document.addEventListener(`click`,async e=>{let t=e.target.closest(`button`);if(!t)return;let n=t.dataset.action;if(n===`power`){let e=Number(t.dataset.id),n=Number(t.dataset.status);t.disabled=!0,await i(e,n),setTimeout(()=>{t.disabled=!1},500)}n===`timer`&&s(Number(t.dataset.id))}),document.querySelector(`#good-night-button`)?.addEventListener(`click`,async()=>{await i(6,0)})}function d(t){return`
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
          data-action="power"
          data-id="${t.id}"
          data-status="1"
        >
          EIN
        </button>

        <button
          class="action-button action-off"
          data-action="power"
          data-id="${t.id}"
          data-status="0"
        >
          AUS
        </button>

        <button
          class="action-button timer-button"
          data-action="timer"
          data-id="${t.id}"
        >
          ${e.timer}
        </button>
      </div>
    </article>
  `}function f(t){return`
    <main class="app-shell">
      <header class="topbar">
        <h1>Steckdosen</h1>
      </header>

      <section class="outlet-grid">
        ${t.map(d).join(``)}
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
            ${[5,10,15,30].map(e=>`
                <button
                  class="timer-option"
                  data-minutes="${e}"
                >
                  <span>${e} Minuten</span>
                  <small>Schnellwahl</small>
                </button>
              `).join(``)}
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
  `}var p=document.querySelector(`#app`);if(!p)throw Error(`App container not found`);p.innerHTML=f(t),u(),l();