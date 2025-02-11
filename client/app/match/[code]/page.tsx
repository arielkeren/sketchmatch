"use client";

import OpponentCanvas from "@/app/components/OpponentCanvas";
import PlayerCanvas from "@/app/components/PlayerCanvas";
import Header from "@/app/components/Header";
import useDisableContextMenu from "@/app/hooks/useDisableContextMenu";
import useServer from "@/app/hooks/useServer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Params, Result, Word } from "@/app/types";
import WaitingForOpponent from "@/app/components/WaitingForOpponent";
import GameScreen from "@/app/components/GameScreen";
import useAuth from "@/app/hooks/useAuth";
import SketchInfo from "@/app/components/SketchInfo";
import Ready from "@/app/components/Ready";
import RoundInfo from "@/app/components/RoundInfo";
import GameManager from "@/app/components/GameManager";
import Results from "@/app/components/Results";
import GameResult from "@/app/components/GameResult";
import { useParams } from "next/navigation";
import MatchNotFound from "@/app/components/MatchNotFound";

const Match: React.FC = () => {
  const [word, setWord] = useState<Word | null>(null);
  const [guess, setGuess] = useState<Word | null>(null);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [isStopped, setIsStopped] = useState(true);
  const [opponent, setOpponent] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isOpponentReady, setIsOpponentReady] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [hasWinEventBeenHandled, setHasWinEventBeenHandled] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const params = useParams<Params>();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const server = useServer();
  const user = useAuth();
  useDisableContextMenu();

  const readyUp = () => {
    if (!server || server.disconnected) return;

    setIsReady(true);
    server.emit("ready");

    if (round === 6) {
      setRound(1);
      setScore(0);
      setOpponentScore(0);
      setResults([]);
    }
  };

  const endRound = useCallback(
    (isWin: boolean) => {
      setResults([...results, { word: word!, guess: guess! }]);
      setWord(null);
      setGuess(null);
      setRound(prevRound => prevRound + 1);
      setTimeLeft(30);
      setIsStopped(true);
      setHasWinEventBeenHandled(false);

      if (isWin) {
        setScore(prevScore => prevScore + 1);
        if (server && server.connected) server.emit("win");
      }
    },
    [guess, results, word, server]
  );

  useEffect(() => {
    if (!server || server.disconnected) return;

    server.emit("join", { username: user.username, code: params.code });
  }, [server, user.username, params.code]);

  useEffect(() => {
    if (!server || server.disconnected) return;

    const handleJoin = (data: any) => setOpponent(data.username);
    const handleReady = () => setIsOpponentReady(true);
    const handleStart = (data: any) => {
      setIsReady(false);
      setIsOpponentReady(false);
      setWord(data.word);
      setIsStopped(false);
    };
    const handleWin = () => {
      if (hasWinEventBeenHandled) return;

      setHasWinEventBeenHandled(true);
      setOpponentScore(prevScore => prevScore + 1);
      endRound(false);
    };
    const handleError = () => setIsNotFound(true);

    server.on("join", handleJoin);
    server.on("ready", handleReady);
    server.on("start", handleStart);
    server.on("win", handleWin);
    server.on("error", handleError);

    return () => {
      server.off("join", handleJoin);
      server.off("ready", handleReady);
      server.off("start", handleStart);
      server.off("win", handleWin);
      server.off("error", handleError);
    };
  }, [server, endRound, hasWinEventBeenHandled]);

  if (isNotFound)
    return (
      <>
        <Header />
        <MatchNotFound />
      </>
    );

  if (round === 6)
    return (
      <>
        <Header />
        <GameResult score={score} opponentScore={opponentScore} />
        <div className="flex" style={{ height: "calc(100vh - 96px)" }}>
          <GameScreen username={user.username} score={score} isLeft={true}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Ready isReady={isReady} readyUp={readyUp} />
              <Results results={results} />
            </div>
          </GameScreen>
          <GameScreen
            username={opponent ?? ""}
            score={opponentScore}
            isLeft={false}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Ready isReady={isOpponentReady} readyUp={null} />
              <Results results={results} />
            </div>
          </GameScreen>
        </div>
      </>
    );

  return (
    <>
      <Header />

      {!isStopped && (
        <>
          <SketchInfo word={word!} guess={guess} isCentered={true} />
          <RoundInfo round={round} timeLeft={timeLeft} />
          <GameManager
            canvas={canvas}
            word={word!}
            timeLeft={timeLeft}
            setGuess={setGuess}
            setTimeLeft={setTimeLeft}
            endRound={endRound}
          />
        </>
      )}

      <div className="flex" style={{ height: "calc(100vh - 96px)" }}>
        <GameScreen username={user.username} score={score} isLeft={true}>
          {!isStopped ? (
            <PlayerCanvas canvas={canvas} />
          ) : opponent !== null ? (
            <Ready isReady={isReady} readyUp={readyUp} />
          ) : null}
        </GameScreen>

        {opponent === null ? (
          <WaitingForOpponent />
        ) : (
          <GameScreen username={opponent} score={opponentScore} isLeft={false}>
            {!isStopped ? (
              <OpponentCanvas />
            ) : (
              <Ready isReady={isOpponentReady} readyUp={null} />
            )}
          </GameScreen>
        )}
      </div>
    </>
  );
};

export default Match;
