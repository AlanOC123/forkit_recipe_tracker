import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../shared/hooks";
import { BarLoader } from "react-spinners"

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center, justify-center, bg-background text-neutral-900">
                Loading...
                <BarLoader color="var(--color-primary-500)" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/"} state={{ from: location }} replace />
    }

    return <Outlet />;
}

export default ProtectedRoute;