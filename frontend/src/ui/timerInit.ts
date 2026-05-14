import {
  fetchTimers
} from '../api'

import {
  startCountdownFromSeconds
} from './timerCountdown'

export async function initTimers() {
  try {
    const timers =
      await fetchTimers()

    for (const timer of timers) {
      startCountdownFromSeconds(
        timer.outletID,
        timer.remainingSeconds
      )
    }
  }
  catch (error) {
    console.error(error)
  }
}