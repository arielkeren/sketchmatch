import { useEffect } from "react";

const useDisableContextMenu = () =>
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("contextmenu", preventContextMenu);

    return () => window.removeEventListener("contextmenu", preventContextMenu);
  }, []);

export default useDisableContextMenu;
