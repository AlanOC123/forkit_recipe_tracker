import { authContextAPI } from '../context';
import { useContext } from "react";

const useAuth = () => {
    const { AuthContext } = authContextAPI;
    return useContext(AuthContext)
}

export default useAuth;