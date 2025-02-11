import { useContext } from "react";
import { ServerContext } from "../components/ServerContextProvider";

const useServer = () => useContext(ServerContext);

export default useServer;
