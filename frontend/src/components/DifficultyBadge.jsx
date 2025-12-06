

const DIFFICULTY_MAP = {
    "Easy": "success",
    "Medium": "warning",
    "Hard": "danger",
}

const STATUS_MAP = {
    "Draft": "secondary",
    "Private": "info",
    "Public": "primary"
}

export function DifficultyBadge({ difficulty }) {
    const bgKey = DIFFICULTY_MAP[difficulty]

    return (
        <Badge pill bg={bgKey}>{difficulty}</Badge>
    )
}

export function StatusBadge({ status }) {
    const bgKey = STATUS_MAP[status]

    return (
        <Badge pill bg={bgKey}>{status}</Badge>
    )
}