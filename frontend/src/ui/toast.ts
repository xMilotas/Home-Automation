export function showToast(message: string) {
    const toast = document.querySelector<HTMLDivElement>('#toast')

    if (!toast) {
        return
    }

    toast.textContent = message

    toast.classList.add('toast-visible')

    setTimeout(() => {
        toast.classList.remove('toast-visible')
    }, 2000)
}