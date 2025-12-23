import Context from "./Context";
import { useState } from "react";
import { useAuth } from "../../../../../shared/hooks";
import { storageService } from "../../../../../api";
import { getStorageEmailKey } from "../../constants";

const Provider = ({ children }) => {
    const { submitLogin } = useAuth();
    const STORAGE_EMAIL_KEY = getStorageEmailKey();

    const existingEmail =
        storageService.getItemFromStorage(STORAGE_EMAIL_KEY) || "";

    const [credentials, setCredentials] = useState({
        email: existingEmail,
        password: "",
    });
    const [cardHeader, setCardHeader] = useState("Enter Credentials");

    const isValidEmail = () => credentials.email && credentials.email.includes('@');

    const updateCredentials = (field, value) => {
        const newState = { ...credentials };
        newState[field] = value;
        setCredentials(() => newState);
    };

    const submitCredentials = async () => {
        if (isValidEmail) {
            storageService.setItemToStorage(STORAGE_EMAIL_KEY, credentials.email);
        }

        await submitLogin(credentials);
    };

    const updateCardHeader = (newValue) => setCardHeader(newValue);

    return (
        <Context.Provider
            value={{
                credentials,
                cardHeader,
                isValidEmail,
                updateCredentials,
                submitCredentials,
                updateCardHeader,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
