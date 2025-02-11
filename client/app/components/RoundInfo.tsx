type Props = {
  round: number;
  timeLeft: number;
};

const RoundInfo: React.FC<Props> = ({ round, timeLeft }) => {
  return (
    <div className="absolute bottom-5 left-5 z-10">
      <p className="text-xl font-medium select-none">{timeLeft} seconds left</p>
      <p className="text-xl font-bold select-none">Round {round}/5</p>
    </div>
  );
};

export default RoundInfo;
