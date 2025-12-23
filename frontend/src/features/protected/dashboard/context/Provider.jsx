import Context from "./Context";
import { useState } from "react";

const Provider = ({ children }) => {
    const [pageHeader, setPageHeader] = useState('');

    return (
        <Context.Provider value={{ pageHeader, setPageHeader }}>{children}</Context.Provider>
    )
}

export default Provider;