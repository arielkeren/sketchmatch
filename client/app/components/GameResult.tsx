type Props = {
  score: number;
  opponentScore: number;
};

const SketchInfo: React.FC<Props> = ({ score, opponentScore }) => {
  return (
    <div className="absolute top-[116px] flex flex-col justify-center z-10 p-3 bg-gray-100 rounded h-20 w-96 drop-shadow-lg left-1/2 -translate-x-1/2">
      <p className="text-2xl font-bold text-center uppercase select-none">
        {score > opponentScore
          ? "You won"
          : score < opponentScore
          ? "You lost"
          : "Draw"}
      </p>
      <p className="text-lg font-medium text-center select-none">
        {score > opponentScore
          ? "Proved your skills!"
          : score < opponentScore
          ? "Good luck next time!"
          : "Rematch anyone?"}
      </p>
    </div>
  );
};

export default SketchInfo;
