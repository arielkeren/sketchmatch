import { useEffect } from "react";

const useCanvas = (canvas: React.MutableRefObject<HTMLCanvasElement | null>) =>
  useEffect(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");

    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 15;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }, [canvas]);

export default useCanvas;
