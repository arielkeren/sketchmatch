import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
