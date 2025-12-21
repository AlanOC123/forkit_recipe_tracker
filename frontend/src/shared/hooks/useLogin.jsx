import { useContext } from "react";
import { LoginContext } from "../context";

const useLogin = () => useContext(LoginContext.Context);

export default useLogin;