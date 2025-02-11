import { useEffect, useState } from "react";
import { Word } from "../types";

type Props = {
  word: Word;
  guess: Word | null;
  isCentered?: boolean;
};

const SketchInfo: React.FC<Props> = ({ word, guess, isCentered }) => {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const getRandomPhrase = () => {
      const STARTERS = [
        "Hmm...",
        "Let's see,",
        "Let me see,",
        "Well,",
        "Umm...",
      ];
      const PHRASES = [
        "I think it's",
        "it looks like",
        "it might be",
        "it could be",
        "maybe it's",
        "maybe it is",
        "it seems like",
        "it appears to be",
        "it resembles",
      ];
      const article = "aeiou".includes(word[0].toLowerCase()) ? "an" : "a";

      return (
        STARTERS[Math.floor(Math.random() * STARTERS.length)] +
        " " +
        PHRASES[Math.floor(Math.random() * PHRASES.length)] +
        " " +
        article
      );
    };

    setPhrase(getRandomPhrase());
  }, [guess, word]);

  return (
    <div
      className={`absolute top-[116px] flex flex-col justify-center z-10 p-3 bg-gray-100 rounded h-20 w-96 drop-shadow-lg ${
        isCentered ? "left-1/2 -translate-x-1/2" : "left-5"
      }`}
    >
      <p className="text-2xl font-bold select-none">Sketch a {word}</p>
      <p className="text-lg font-medium select-none">
        {guess ? phrase + " " + guess : "Start sketching!"}
      </p>
    </div>
  );
};

export default SketchInfo;
