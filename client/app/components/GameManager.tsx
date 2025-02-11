import { useEffect } from "react";
import { Word } from "../types";
import useServer from "../hooks/useServer";
import * as tf from "@tensorflow/tfjs";
import useModel from "../hooks/useModel";

type Props = {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  word: Word;
  timeLeft: number;
  setGuess: React.Dispatch<React.SetStateAction<Word | null>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  endRound: (isWin: boolean) => void;
};

const GameManager: React.FC<Props> = ({
  canvas,
  word,
  timeLeft,
  setGuess,
  setTimeLeft,
  endRound,
}) => {
  const server = useServer();
  const guessSketch = useModel();

  useEffect(() => {
    const guessTimer = setInterval(makeGuess, 3000);
    const roundTimer = setInterval(updateTime, 1000);

    function updateTime() {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(roundTimer);
          clearInterval(guessTimer);
          return 0;
        }

        return prevTime - 1;
      });
    }

    async function makeGuess() {
      if (!canvas.current || !server || server.disconnected) return;

      const guess = guessSketch(canvas.current);

      if (!guess) return;

      setGuess(guess);
      if (guess == word) {
        clearInterval(roundTimer);
        clearInterval(guessTimer);
        endRound(true);
      }
    }

    return () => {
      clearInterval(roundTimer);
      clearInterval(guessTimer);
    };
  }, [canvas, server, word, setGuess, setTimeLeft, endRound, guessSketch]);

  useEffect(() => {
    if (timeLeft === 0) endRound(false);
  }, [timeLeft, endRound]);

  return <></>;
};

export default GameManager;
