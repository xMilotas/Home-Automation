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