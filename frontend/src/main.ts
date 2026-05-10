import './style.css'
import { icons } from './icons'
import { sendPowerRequest } from './api'

type Outlet = {
  id: number
  name: string
  icon: string
}
const outlets: Outlet[] = [
  {
    id: 1,
    name: 'Wohnzimmer groß',
    icon: icons.light
  },
  {
    id: 2,
    name: 'Wohnzimmer klein',
    icon: icons.light
  },
  {
    id: 3,
    name: 'Schlafzimmer',
    icon: icons.bedroom
  },
  {
    id: 4,
    name: 'Schlitten',
    icon: icons.power
  }
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

async function sendRequest(
  outletID: number,
  outletStatus: number,
  timer?: number
) {
  const success = await sendPowerRequest(
    outletID,
    outletStatus,
    timer
  )

  if (success) {
    showToast('Befehl gesendet')
  }
  else {
    showToast('Fehler beim Senden')
  }
}

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
          data-id="${outlet.id}"
          data-status="1"
        >
          EIN
        </button>

        <button
          class="action-button action-off"
          data-id="${outlet.id}"
          data-status="0"
        >
          AUS
        </button>

        <button
          class="action-button timer-button"
          data-timer="${outlet.id}"
        >
          ${icons.timer}
        </button>
      </div>
    </article>
  `
}

app.innerHTML = `
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
`

document
  .querySelectorAll<HTMLButtonElement>('[data-status]')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      const id = Number(button.dataset.id)
      const status = Number(button.dataset.status)

      button.disabled = true

      await sendRequest(id, status)

      setTimeout(() => {
        button.disabled = false
      }, 500)
    })
  })

document
  .querySelector<HTMLButtonElement>('#good-night-button')
  ?.addEventListener('click', async ()  => {
    sendRequest(6, 0)
  })

const timerSheet =
  document.querySelector<HTMLDivElement>('#timer-sheet')

let selectedTimerOutlet: number | null = null

document
  .querySelectorAll<HTMLButtonElement>('[data-timer]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      selectedTimerOutlet = Number(button.dataset.timer)

      const outlet = outlets.find(
        (item) => item.id === selectedTimerOutlet
      )

      const title =
        document.querySelector('#timer-title')

      if (title && outlet) {
        title.textContent = outlet.name
      }

      timerSheet?.classList.remove('hidden')

      requestAnimationFrame(() => {
        timerSheet?.classList.add('timer-sheet-visible')
      })
    })
  })

function closeTimerSheet() {
  timerSheet?.classList.remove('timer-sheet-visible')

  setTimeout(() => {
    timerSheet?.classList.add('hidden')
  }, 220)
}

document
  .querySelector('#close-timer')
  ?.addEventListener('click', closeTimerSheet)

document
  .querySelector('.timer-sheet-backdrop')
  ?.addEventListener('click', closeTimerSheet)

document
  .querySelectorAll<HTMLButtonElement>('.timer-option')
  .forEach((button) => {
    button.addEventListener('click', () => {
      if (!selectedTimerOutlet) {
        return
      }

      const minutes = Number(button.dataset.minutes)

      sendRequest(
        selectedTimerOutlet,
        1,
        minutes
      )

      closeTimerSheet()
    })
  })

document
  .querySelector('#start-custom-timer')
  ?.addEventListener('click', () => {
    if (!selectedTimerOutlet) {
      return
    }

    const input =
      document.querySelector<HTMLInputElement>(
        '#custom-minutes'
      )

    const value = Number(input?.value)

    if (!value || value < 1) {
      showToast('Ungültiger Timer')
      return
    }

    sendRequest(
      selectedTimerOutlet,
      1,
      value
    )

    closeTimerSheet()
  })


function showToast(message: string) {
  const toast =
    document.querySelector<HTMLDivElement>('#toast')

  if (!toast) {
    return
  }

  toast.textContent = message

  toast.classList.add('toast-visible')

  setTimeout(() => {
    toast.classList.remove('toast-visible')
  }, 2000)
}