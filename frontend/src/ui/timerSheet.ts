import { outlets } from '../data/outlets'
import { sendRequest } from '../services/powerService'
import { showToast } from './toast'

let selectedOutletId: number | null = null

function getElements() {
    return {
        timerSheet:
            document.querySelector<HTMLDivElement>(
                '#timer-sheet'
            ),

        title:
            document.querySelector<HTMLHeadingElement>(
                '#timer-title'
            ),

        input:
            document.querySelector<HTMLInputElement>(
                '#custom-minutes'
            )
    }
}

export function openTimerSheet(outletId: number) {
    const { timerSheet, title } = getElements()

    selectedOutletId = outletId

    const outlet = outlets.find(
        (item) => item.id === outletId
    )

    if (title && outlet) {
        title.textContent = outlet.name
    }

    timerSheet?.classList.remove('hidden')

    requestAnimationFrame(() => {
        timerSheet?.classList.add(
            'timer-sheet-visible'
        )
    })
}

export function closeTimerSheet() {
    const { timerSheet } = getElements()

    timerSheet?.classList.remove(
        'timer-sheet-visible'
    )

    setTimeout(() => {
        timerSheet?.classList.add('hidden')
    }, 220)
}

export function initializeTimerSheet() {
    document
        .querySelector('#close-timer')
        ?.addEventListener('click', closeTimerSheet)

    document
        .querySelector('.timer-sheet-backdrop')
        ?.addEventListener('click', closeTimerSheet)

    document
        .querySelectorAll<HTMLButtonElement>(
            '.timer-option'
        )
        .forEach((button) => {
            button.addEventListener(
                'click',
                async () => {
                    if (!selectedOutletId) {
                        return
                    }

                    const minutes = Number(
                        button.dataset.minutes
                    )

                    await sendRequest(
                        selectedOutletId,
                        1,
                        minutes
                    )

                    closeTimerSheet()
                }
            )
        })

    document
        .querySelector('#start-custom-timer')
        ?.addEventListener('click', async () => {
            if (!selectedOutletId) {
                return
            }

            const { input } = getElements()

            const value = Number(input?.value)

            if (!value || value < 1) {
                showToast('Ungültiger Timer')
                return
            }

            await sendRequest(
                selectedOutletId,
                1,
                value
            )

            closeTimerSheet()
        })
}