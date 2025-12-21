import { Route, Routes } from "react-router-dom";
import { AuthContext } from './shared/context';
import { LandingPage, ProtectedRoute, PublicRoute, Login, Register } from "./features";
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
                    <Route path="/home" element={<h1>Home</h1>} />
                    <Route path="/profile" element={<h1>Profile</h1>} />
                </Route>
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
