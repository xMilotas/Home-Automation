import { icons } from '../icons'

const activeCountdowns =
    new Map<number, number>()

function formatRemaining(
    totalSeconds: number
) {
    const minutes =
        Math.floor(totalSeconds / 60)

    const seconds =
        totalSeconds % 60

    return `${minutes}:${String(
        seconds
    ).padStart(2, '0')}`
}

function getTimerElement(
    outletId: number
) {
    return document.querySelector(
        `[data-timer-display="${outletId}"]`
    )
}

function setTimerDisplay(
    outletId: number,
    content: string
) {
    const element =
        getTimerElement(outletId)

    if (!element) {
        return
    }

    element.innerHTML = content
}

export function startCountdownFromSeconds(
    outletId: number,
    remainingSeconds: number
) {
    const existingInterval =
        activeCountdowns.get(outletId)

    if (existingInterval) {
        clearInterval(existingInterval)
    }

    setTimerDisplay(
        outletId,
        formatRemaining(
            remainingSeconds
        )
    )

    const interval = window.setInterval(() => {
        remainingSeconds--

        if (remainingSeconds <= 0) {
            clearInterval(interval)

            activeCountdowns.delete(
                outletId
            )

            setTimerDisplay(
                outletId,
                icons.timer
            )

            return
        }

        setTimerDisplay(
            outletId,
            formatRemaining(
                remainingSeconds
            )
        )
    }, 1000)

    activeCountdowns.set(
        outletId,
        interval
    )
}

export function startCountdown(
    outletId: number,
    minutes: number
) {
    startCountdownFromSeconds(
        outletId,
        minutes * 60
    )
}