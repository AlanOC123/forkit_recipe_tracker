import { createContext, useContext, useState, useEffect } from "react";
import { register, login, logout, getCurrentUser } from "../services/authService";
import { getTokens, isTokenUsable } from "../services/tokenService";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const registerUser = async (userData) => {
        const { id, username, email } = await register(userData);
        setUser({ id, username, email });
    }

    const loginUser = async (credentials) => {
        const userData = await login(credentials);
        setUser(userData)
    }

    const logoutUser = () => {
        logout()
        setUser(null)
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { refresh } = getTokens();

                if (!isTokenUsable(refresh)) {
                    setIsLoading(false);
                    return;
                }

                const userData = await getCurrentUser();
                setUser(userData);
                setIsLoading(false);
            } catch {
                setIsLoading(false);
            }
        };

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading, 
            loginUser,
            logoutUser,
            registerUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}