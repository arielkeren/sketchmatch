import CopyCodeButton from "./CopyCodeButton";

const WaitingForOpponent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center flex-1 items-center gap-3 bg-gray-900">
      <h1 className="font-bold text-4xl text-white">Waiting for opponent</h1>
      <CopyCodeButton isLink={true} />
      <CopyCodeButton isLink={false} />
    </div>
  );
};

export default WaitingForOpponent;
