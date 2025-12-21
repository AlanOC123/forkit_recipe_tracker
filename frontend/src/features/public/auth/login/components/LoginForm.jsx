import { AuthCard } from "../../components/AuthCard"
import { Button, GridItem } from '../../../../../shared/components';
import { Link } from "react-router-dom";
import { cn } from "../../../../../shared/utils";
import { useLogin } from "../../../../../shared/hooks";

export const LoginForm = () => {
    const {  }
    return (
        <GridItem colSpan="full" className={"grid place-content-center place-items-center w-full h-full"}>
            <AuthCard>
                <AuthCard.Header>Enter Email</AuthCard.Header>
                <AuthCard.Inputs>
                    <input type="email" className={cn("text-base p-2 rounded-full border-2")} />
                </AuthCard.Inputs>
                <AuthCard.Controls>
                    <Button variant={"primary"}>Continue</Button>
                    <Button variant={"secondary"}>
                        <Link to={"/register"}>Sign Up</Link>
                    </Button>
                </AuthCard.Controls>
            </AuthCard>
        </GridItem>
    );
}