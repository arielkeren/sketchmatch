import { BiSolidDislike } from "react-icons/bi";

type Props = {
  isReady: boolean;
  readyUp: (() => void) | null;
};

const Ready: React.FC<Props> = ({ isReady, readyUp }) => {
  if (readyUp)
    return (
      <button
        onClick={readyUp}
        disabled={isReady}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-tr rounded-br-3xl rounded-bl rounded-tl-3xl p-8 bg-gray-800 drop-shadow-lg border-b-8 border-r-8 border-purple-300 transition-all duration-100 hover:border-b-4 hover:border-r-4"
      >
        <BiSolidDislike
          className={`text-6xl text-gray-400 transition-all ${
            isReady && "text-purple-300 rotate-180"
          }`}
        />
      </button>
    );

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-tr rounded-br-3xl rounded-bl rounded-tl-3xl p-8 bg-gray-800 drop-shadow-lg">
      <BiSolidDislike
        className={`text-6xl text-gray-400 transition-all ${
          isReady && "text-purple-300 rotate-180"
        }`}
      />
    </div>
  );
};

export default Ready;
