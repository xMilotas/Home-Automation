export async function sendPowerRequest(
  outletID: number,
  outletStatus: number,
  timer?: number
) {
  try {
    await fetch('/api/PowerPlugs', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        outletID,
        outletStatus,
        timer: timer ?? false
      })
    })

    return true
  }
  catch (error) {
    console.error(error)
    return false
  }
}

export type ActiveTimer = {
  outletID: number
  remainingSeconds: number
}

export async function fetchTimers() {
  const response = await fetch(
    '/api/PowerPlugs/timers'
  )

  if (!response.ok) {
    throw new Error(
      'Failed to fetch timers'
    )
  }

  return response.json() as Promise<ActiveTimer[]>
}