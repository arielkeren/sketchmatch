"use client";

import { useEffect, useState } from "react";
import { getRandomWord, WORDS } from "../words";
import RoundOver from "../components/RoundOver";
import Header from "../components/Header";
import { Result, Word } from "../types";
import Sketch from "../components/Sketch";
import useDisableContextMenu from "../hooks/useDisableContextMenu";
import * as tf from "@tensorflow/tfjs";

const Singleplayer: React.FC = () => {
  const [round, setRound] = useState(1);
  const [isRoundOver, setIsRoundOver] = useState(true);
  const [word, setWord] = useState<Word>("apple");
  const [guess, setGuess] = useState<Word | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  useDisableContextMenu();

  useEffect(() => setWord(getRandomWord(results)), [results]);

  const changeGuess = (newGuess: Word) => setGuess(newGuess);

  const startRound = () => {
    if (round > 5) {
      setIsRoundOver(true);
      setRound(1);
      setResults([]);
      setWord(getRandomWord(results));
      setGuess(null);
      return;
    }

    setGuess(null);
    setIsRoundOver(false);
  };

  const endRound = () => {
    setIsRoundOver(true);
    setRound(round + 1);
    setWord(getRandomWord(results));
    setGuess(prevGuess => {
      if (prevGuess) setResults([...results, { word, guess: prevGuess }]);
      return null;
    });
  };

  if (isRoundOver)
    return (
      <>
        <Header />
        <RoundOver
          round={round}
          startRound={startRound}
          word={word}
          results={results}
        />
      </>
    );

  return (
    <>
      <Header />
      <Sketch
        round={round}
        endRound={endRound}
        word={word}
        guess={guess}
        changeGuess={changeGuess}
      />
    </>
  );
};

export default Singleplayer;
