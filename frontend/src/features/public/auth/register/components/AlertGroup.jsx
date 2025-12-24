import { Alert } from "../../../../../shared/components";

export const AlertGroup = ({ alerts=[] }) => {
    const alertMsgs = alerts.map(msg => <Alert variant={"error"}>{msg}</Alert>)

    return (
        <div className="grid gap-4 absolute top-1 right-1 p-2">
            {alertMsgs}
        </div>
    )
}