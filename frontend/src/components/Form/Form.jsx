export function Form({ onSubmit, children, ...props }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e)
    }

    return (
        <form onSubmit={handleSubmit} noValidate {...props}>{children}</form>
    )
}