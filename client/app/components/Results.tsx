import { Result } from "../types";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

type Props = {
  results: Result[];
};

const Results: React.FC<Props> = ({ results }) => {
  return (
    <div className="flex flex-col gap-4">
      {results.map((result, index) => (
        <div key={index} className="flex gap-2 items-center">
          {result.word === result.guess ? (
            <FaCheck className="text-green-500 text-2xl" />
          ) : (
            <IoMdClose className="text-red-500 text-2xl" />
          )}
          <p className="text-xl font-medium select-none">{result.word}</p>
          <p className="text-xl text-gray-400 italic select-none">
            Guess: {result.guess}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
