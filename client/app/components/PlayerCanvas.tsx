import { useState, useRef, useEffect } from "react";
import { FaEraser } from "react-icons/fa6";
import useServer from "../hooks/useServer";
import { isGuessResponse, Stroke, Word } from "../types";
import useCanvas from "../hooks/useCanvas";

type Props = {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
};

const PlayerCanvas: React.FC<Props> = ({ canvas }) => {
  const [isPressed, setIsPressed] = useState(false);
  const server = useServer();
  useCanvas(canvas);

  const beginDraw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvas.current || event.button === 1) return;

    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsPressed(true);

    context.strokeStyle = event.button === 0 ? "black" : "white";

    if (server && server.connected)
      server.emit(
        "stroke", {
          stroke: {
            x: event.nativeEvent.offsetX / canvas.current.width,
            y: event.nativeEvent.offsetY / canvas.current.height,
            color: context.strokeStyle,
            isNew: true,
          },
        });
  };

  const updateDraw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPressed || !canvas.current) return;

    const context = canvas.current.getContext("2d");
    if (!context) return;

    const stroke: Stroke = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
      color: context.strokeStyle,
      isNew: false,
    };

    drawStroke(stroke);
    stroke.x /= canvas.current.width;
    stroke.y /= canvas.current.height;

    if (server && server.connected)
      server.emit("stroke", { stroke });
  };

  const endDraw = () => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.closePath();
    setIsPressed(false);
  };

  const drawStroke = (stroke: Stroke) => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.strokeStyle = stroke.color;
    context.lineTo(stroke.x, stroke.y);
    context.stroke();
  };

  const clear = () => {
    if (!canvas.current) return;
    const context = canvas.current.getContext("2d");
    if (!context) return;

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);

    if (server && server.connected)
      server.emit("clear");
  };

  useEffect(() => {
    const resize = () => {
      if (!canvas.current) return;
      canvas.current.width = window.innerWidth / 2 - 8;
      canvas.current.height = window.innerHeight - 196;
      const context = canvas.current.getContext("2d");

      if (!context) return;

      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.current.width, canvas.current.height);
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 15;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [canvas]);

  return (
    <div className="relative">
      <canvas
        ref={canvas}
        onMouseDown={beginDraw}
        onMouseMove={updateDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />
      <button
        onClick={clear}
        className="absolute bottom-5 right-5 bg-gray-100 p-2 rounded drop-shadow-lg transition-colors duration-200 hover:bg-gray-900 hover:text-white"
      >
        <FaEraser className="text-4xl" />
      </button>
    </div>
  );
};

export default PlayerCanvas;
