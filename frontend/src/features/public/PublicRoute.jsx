import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../shared/hooks";

const PublicRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (user) {
        return <Navigate to={"/dashboard"} replace />
    }

    return <Outlet />;
}

export default PublicRoute;