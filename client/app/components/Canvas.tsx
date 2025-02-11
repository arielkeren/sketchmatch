import { useCallback, useEffect, useState } from "react";
import { FaEraser } from "react-icons/fa6";

type Props = {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
};

const Canvas: React.FC<Props> = ({ canvas }) => {
  const [isPressed, setIsPressed] = useState(false);

  const beginDraw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas.current || event.button === 1) return;

    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsPressed(true);

    context.strokeStyle = event.button === 0 ? "black" : "white";
  };

  const updateDraw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPressed || !canvas.current) return;

    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.stroke();
  };

  const endDraw = () => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;
    context.closePath();
    setIsPressed(false);
  };

  const clear = useCallback(() => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
  }, [canvas]);

  useEffect(() => {
    const resize = () => {
      if (!canvas.current) return;
      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight - 116;
      clear();
      const context = canvas.current.getContext("2d");

      if (!context) return;

      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 15;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [canvas, clear]);

  return (
    <div className="relative">
      <canvas
        ref={canvas}
        onMouseDown={beginDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        className="translate-y-[20px]"
      />
      <button
        onClick={clear}
        className="absolute bottom-0 right-5 bg-gray-100 p-2 rounded drop-shadow-lg transition-colors duration-200 hover:bg-gray-900 hover:text-white"
      >
        <FaEraser className="text-4xl" />
      </button>
    </div>
  );
};

export default Canvas;
