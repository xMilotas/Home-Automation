import type { Outlet } from '../types/outlet'
import { icons } from '../icons'

function renderOutletCard(outlet: Outlet) {
  return `
    <article class="outlet-card">
      <div class="outlet-header">
        <div class="outlet-icon">
          ${outlet.icon}
        </div>

        <div class="outlet-title-group">
          <h2 class="outlet-title">
            ${outlet.name}
          </h2>
        </div>
      </div>

      <div class="outlet-actions">
        <button
          class="action-button action-on"
          data-action="power"
          data-id="${outlet.id}"
          data-status="1"
        >
          EIN
        </button>

        <button
          class="action-button action-off"
          data-action="power"
          data-id="${outlet.id}"
          data-status="0"
        >
          AUS
        </button>

        <button
          class="action-button timer-button"
          data-action="timer"
          data-id="${outlet.id}"
        >
          <span
            data-timer-display="${outlet.id}"
          >
            ${icons.timer}
          </span>
        </button>
      </div>
    </article>
  `
}

export function renderApp(outlets: Outlet[]) {
  return `
    <main class="app-shell">
      <header class="topbar">
        <h1>Steckdosen</h1>
      </header>

      <section class="outlet-grid">
        ${outlets.map(renderOutletCard).join('')}
      </section>

      <section class="scene-section">
        <div class="scene-card">
          <div class="scene-copy">
            <span class="scene-label">
              Szene
            </span>

            <h2>
              <span class="scene-icon">
                ${icons.moon}
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
            ${[5, 10, 15, 30]
      .map((minutes) => `
                <button
                  class="timer-option"
                  data-minutes="${minutes}"
                >
                  <span>${minutes} Minuten</span>
                  <small>Schnellwahl</small>
                </button>
              `)
      .join('')}
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
  `
}