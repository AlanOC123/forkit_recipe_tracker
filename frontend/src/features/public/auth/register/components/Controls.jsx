import { useRegister } from "../hooks";
import { AuthCard } from "../../components";
import { Link } from "react-router-dom";

export const Controls = () => {
    const { canSubmit, submitUserData } = useRegister();

    return (
        <AuthCard.Controls>
            <AuthCard.ControlBtn
                variant={"primary"}
                disabled={canSubmit ? false : true}
                onClick={submitUserData}
            >
                {canSubmit ? "Sign Up Now" : "Enter Details First"}
            </AuthCard.ControlBtn>
            <AuthCard.ControlBtn variant={"secondary"}>
                <Link to="/login">Log In</Link>
            </AuthCard.ControlBtn>
        </AuthCard.Controls>
    );
};