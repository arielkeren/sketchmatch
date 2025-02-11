import { Result, Word } from "../types";
import Results from "./Results";

type Props = {
  round: number;
  startRound: () => void;
  word: Word;
  results: Result[];
};

const RoundOver: React.FC<Props> = ({ round, startRound, word, results }) => {
  if (round > 5)
    return (
      <div className="absolute top-1/2 left-1/2 flex flex-col gap-12 -translate-y-1/2 -translate-x-1/2">
        <h2 className="text-9xl font-bold">Game Over</h2>
        <button
          onClick={startRound}
          className="bg-gray-900 rounded h-16 w-64 text-white text-3xl uppercase transition-colors hover:bg-gray-800"
        >
          Play Again
        </button>
        <Results results={results} />
      </div>
    );

  return (
    <div className="absolute top-1/2 left-1/2 flex flex-col gap-12 -translate-y-1/2 -translate-x-1/2">
      <div>
        <h2 className="text-9xl font-bold select-none">Round {round}</h2>
        <p className="text-3xl font-medium select-none">Sketch a {word}</p>
      </div>
      <button
        onClick={startRound}
        className="bg-gray-900 rounded h-16 w-64 text-white text-3xl uppercase select-none transition-colors hover:bg-gray-800"
      >
        Start
      </button>
      <Results results={results} />
    </div>
  );
};

export default RoundOver;
