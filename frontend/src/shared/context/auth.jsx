import { createContext, useState, useEffect } from "react";
import { authAPI, tokenAPI } from "../../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const { getCurrentUserRequest } = authAPI;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = async () => {
        const userData = await getCurrentUserRequest();
        setUser(userData);
    };

    const submitRegister = async (userData) => {
        const { postRegisterUserRequest } = authAPI;
        const { id } = await postRegisterUserRequest(userData);

        if (id) {
            updateUser();
        }
    };

    const submitLogin = async (credentials) => {
        const { postLoginUserRequest } = authAPI;
        const { id } = await postLoginUserRequest(credentials);

        if (id) {
            updateUser();
        }
    };

    const submitLogout = () => {
        const { logoutUser } = authAPI;
        logoutUser();
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const { isTokenUsable, getTokens } = tokenAPI;
            setIsLoading(true);

            try {
                const { REFRESH } = getTokens();

                if (!isTokenUsable(REFRESH)) return;

                updateUser();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                submitLogin,
                submitLogout,
                submitRegister,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthContextAPI = {
    AuthContext,
    AuthProvider
}

export default AuthContextAPI;