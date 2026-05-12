import { sendPowerRequest } from '../api'
import { showToast } from '../ui/toast'

export async function sendRequest(
    outletID: number,
    outletStatus: number,
    timer?: number
) {
    const success = await sendPowerRequest(
        outletID,
        outletStatus,
        timer
    )

    showToast(
        success
            ? 'Befehl gesendet'
            : 'Fehler beim Senden'
    )

    return success
}