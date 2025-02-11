const MatchNotFound: React.FC = () => (
  <div className="absolute top-1/2 left-1/2 flex flex-col -translate-y-1/2 -translate-x-1/2">
    <h2 className="text-7xl font-bold select-none">Match Not Found</h2>
    <p className="text-2xl font-medium select-none">
      The match you&apos;re trying to access doesn&apos;t exist
    </p>
  </div>
);

export default MatchNotFound;
