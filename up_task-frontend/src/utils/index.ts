export function formatDate(dateStr: string) {
    if(dateStr) {
        const dateObj = new Date(dateStr)
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
    } else {
        return ""
    }
}