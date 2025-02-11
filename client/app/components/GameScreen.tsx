import { RiUser3Fill } from "react-icons/ri";

type Props = {
  username: string;
  score: number;
  isLeft: boolean;
  children: React.ReactNode;
};

const GameScreen: React.FC<Props> = ({ username, score, isLeft, children }) => {
  return (
    <div className="relative flex flex-col flex-1 border-4">
      <div
        className={`absolute flex flex-col justify-center items-center h-[100px] mx-5 ${
          !isLeft && "right-0"
        }`}
      >
        <div className="flex justify-center items-center bg-gray-900 rounded-full h-12 w-12 drop-shadow-lg">
          <RiUser3Fill className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-medium select-none">
          {username || "Guest"}
        </h2>
      </div>
      <div
        className={`absolute flex flex-col justify-center items-center h-[100px] mx-5 ${
          isLeft && "right-0"
        }`}
      >
        <p className="text-3xl font-bold">{score}</p>
      </div>
      <div className="h-[100px]"></div>
      {children}
    </div>
  );
};

export default GameScreen;
