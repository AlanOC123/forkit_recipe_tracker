export function cn(...elementClasses) {
    return elementClasses.filter(Boolean).join(' ')
}