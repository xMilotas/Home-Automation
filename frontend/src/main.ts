import './style.css'

import { outlets } from './data/outlets'
import { initializeOutletHandlers }
  from './handlers/outletHandlers'

import { renderApp } from './ui/render'
import { initializeTimerSheet }
  from './ui/timerSheet'

import { initTimers } from './ui/timerInit'

const app =
  document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container not found')
}

app.innerHTML = renderApp(outlets)

initializeOutletHandlers()
initializeTimerSheet()
initTimers()
