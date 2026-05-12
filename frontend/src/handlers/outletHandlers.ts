import { sendRequest } from '../services/powerService'
import { openTimerSheet } from '../ui/timerSheet'

export function initializeOutletHandlers() {
    document.addEventListener('click', async (event) => {
        const target =
            event.target as HTMLElement

        const button =
            target.closest<HTMLButtonElement>('button')

        if (!button) {
            return
        }

        const action = button.dataset.action

        if (action === 'power') {
            const id = Number(button.dataset.id)
            const status = Number(button.dataset.status)

            button.disabled = true

            await sendRequest(id, status)

            setTimeout(() => {
                button.disabled = false
            }, 500)
        }

        if (action === 'timer') {
            const id = Number(button.dataset.id)

            openTimerSheet(id)
        }
    })

    document
        .querySelector('#good-night-button')
        ?.addEventListener('click', async () => {
            await sendRequest(6, 0)
        })
}