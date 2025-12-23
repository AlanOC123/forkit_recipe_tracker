import Context from "./Context";
import { authService, tokensService } from "../../../api";
import { useState, useEffect } from "react";

const Provider = ({ children }) => {
    const { getCurrentUserRequest } = authService;
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = async () => {
        const userData = await getCurrentUserRequest();
        setUser(userData);
    };

    const submitRegister = async (userData) => {
        const { postRegisterRequest } = authService;
        const { id } = await postRegisterRequest(userData);

        if (id) {
            await updateUser();
        }
    };

    const submitLogin = async (credentials) => {
        const { postLoginRequest } = authService;
        const data = await postLoginRequest(credentials);

        if (data.id) {
            await updateUser();
        }

        return data;
    };

    const submitLogout = () => {
        const { logoutUser } = authService;
        logoutUser();
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const { isTokenUseable, getTokens } = tokensService;
            setIsLoading(true);

            try {
                const { REFRESH } = getTokens();

                if (!isTokenUseable(REFRESH)) return;

                await updateUser();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <Context.Provider
            value={{
                user,
                isLoading,
                submitRegister,
                submitLogin,
                submitLogout,
            }}
        >
            {children}
        </Context.Provider>
    );
};


export default Provider;