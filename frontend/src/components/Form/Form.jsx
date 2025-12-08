export function Form({ onSubmit, children, ...props }) {
    const handleSubmit = (e, ...args) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e, ...args)
    }

    return (
        <form onSubmit={handleSubmit} noValidate {...props}>{children}</form>
    )
}