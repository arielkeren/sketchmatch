import { useEffect, useRef } from "react";
import useServer from "../hooks/useServer";
import { Stroke } from "../types";
import useCanvas from "../hooks/useCanvas";

const OpponentCanvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const server = useServer();
  useCanvas(canvas);

  useEffect(() => {
    if (!server) return;

    const drawStroke = (stroke: Stroke) => {
      if (!canvas.current) return;
      const context = canvas.current.getContext("2d");
      if (!context) return;

      const normalizedX = stroke.x * canvas.current.width;
      const normalizedY = stroke.y * canvas.current.height;

      if (stroke.isNew) {
        context.strokeStyle = stroke.color;
        context.beginPath();
        context.moveTo(normalizedX, normalizedY);
        return;
      }

      context.strokeStyle = stroke.color;
      context.lineTo(normalizedX, normalizedY);
      context.stroke();
    };

    const clear = () => {
      if (!canvas.current) return;
      const context = canvas.current.getContext("2d");
      if (!context) return;

      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    };

    server.on("stroke", data => drawStroke(data.stroke));
    server.on("clear", clear);

    return () => {
      server.off("stroke");
      server.off("clear");
    };
  }, [server]);

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
    <div>
      <canvas ref={canvas} />
    </div>
  );
};

export default OpponentCanvas;
