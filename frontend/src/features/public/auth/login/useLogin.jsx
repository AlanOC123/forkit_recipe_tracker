import { useContext } from "react";
import { Context } from "./context";

const useLogin = () => useContext(Context);

export default useLogin;