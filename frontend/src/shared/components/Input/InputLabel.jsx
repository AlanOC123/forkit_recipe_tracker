export const InputLabel = ({ children, ...props }) => {
    return (
        <label className="text-base font-light text-neutral-600 p-2" {...props}>{children}</label>
    )
}