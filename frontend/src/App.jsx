import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./shared/context";
import {
    LandingPage,
    ProtectedRoute,
    PublicRoute,
    Login,
    Register,
    Dashboard,
    Home,
    Courses,
    Cuisines,
    Cookbook
} from "./features";
import { ScrollToAnchor } from "./shared/utils";

function App() {
    return (
        <AuthContext.Provider>
            <ScrollToAnchor />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="" element={<Home />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="cuisines" element={<Cuisines />} />
                        <Route path="cookbook" element={<Cookbook />} />
                    </Route>
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
