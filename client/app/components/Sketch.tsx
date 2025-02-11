"use client";

import { useState, useRef, useEffect } from "react";
import Canvas from "./Canvas";
import RoundInfo from "./RoundInfo";
import { Word } from "../types";
import SketchInfo from "./SketchInfo";
import useModel from "../hooks/useModel";

type Props = {
  round: number;
  endRound: () => void;
  word: Word;
  guess: Word | null;
  changeGuess: (newGuess: Word) => void;
};

const Sketch: React.FC<Props> = ({
  round,
  endRound,
  word,
  guess,
  changeGuess,
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

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
      if (!canvas.current) return;

      const guess = guessSketch(canvas.current);

      if (!guess) return;

      changeGuess(guess);
      if (guess == word) {
        clearInterval(roundTimer);
        clearInterval(guessTimer);
        endRound();
      }
    }

    return () => {
      clearInterval(roundTimer);
      clearInterval(guessTimer);
    };
  }, [changeGuess, endRound, word, guessSketch]);

  useEffect(() => {
    if (timeLeft === 0) {
      endRound();
    }
  }, [timeLeft, endRound]);

  return (
    <>
      <SketchInfo word={word} guess={guess} />
      <Canvas canvas={canvas} />
      <RoundInfo round={round} timeLeft={timeLeft} />
    </>
  );
};

export default Sketch;
