import Context from "./Context";
import { useState } from "react";
import { useAuth } from "../../hooks";
import { storageService } from "../../../api";
import { authConstants } from "../../constants";

const Provider = ({ children }) => {
    const { getStorageEmailKey } = authConstants;
    const existingEmail =
        storageService.getItemFromStorage(getStorageEmailKey()) || "";
    const [credentials, setCredentials] = useState({
        email: existingEmail,
        password: "",
    });

    const updateCredentials = (field, value) => {
        const newState = { ...credentials };
        newState[field] = value;
        setCredentials(() => newState);
    };

    const submitCredentials = async () => {
        const { submitLogin } = useAuth();
        const { data } = await submitLogin(credentials);
        console.log(data);
    };

    return (
        <Context.Provider
            value={{ credentials, updateCredentials, submitCredentials }}
        >
            {children}
        </Context.Provider>
    );
};

export default Provider;
