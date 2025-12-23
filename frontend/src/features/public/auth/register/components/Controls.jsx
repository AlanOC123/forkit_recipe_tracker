import useRegister from "../useRegister";
import { AuthCard } from "../../components";
import { Link } from "react-router-dom";

export const Controls = () => {
    const { canSubmit } = useRegister();

    return (
        <AuthCard.Controls>
            <AuthCard.ControlBtn
                variant={"primary"}
                disabled={canSubmit ? false : true}
            >
                {canSubmit ? "Sign Up Now" : "Enter Details First"}
            </AuthCard.ControlBtn>
            <AuthCard.ControlBtn variant={"secondary"}>
                <Link to="/login">Log In</Link>
            </AuthCard.ControlBtn>
        </AuthCard.Controls>
    );
};