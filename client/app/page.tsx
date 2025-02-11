"use client";

import Link from "next/link";
import Header from "./components/Header";
import useModal from "./hooks/useModal";
import JoinMatchModal from "./components/JoinMatchModal";
import { useRouter } from "next/navigation";
import useServer from "./hooks/useServer";
import useAuth from "./hooks/useAuth";

const Home: React.FC = () => {
  const { isOpen, open, close } = useModal();
  const server = useServer();
  const router = useRouter();
  const user = useAuth();

  const createMatch = () => {
    if (!server || server.disconnected) return;

    server.emit("create");
    server.on("create", data => router.push(`match/${data.code}`));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col px-20 py-40 bg-gray-50">
        <h1 className="text-6xl font-bold">SketchMatch</h1>
        <p className="text-xl font-medium">
          Put your sketching skills to the test
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 py-20">
        <Link
          href="singleplayer"
          className="flex justify-center items-center bg-gray-900 rounded h-16 w-72 text-white text-xl uppercase transition-colors hover:bg-gray-800"
        >
          Singleplayer
        </Link>
        <Link
          href="multiplayer"
          className="flex justify-center items-center bg-gray-900 rounded h-16 w-72 text-white text-xl uppercase transition-colors hover:bg-gray-800"
        >
          Multiplayer
        </Link>
        <button
          onClick={createMatch}
          className="bg-gray-900 rounded h-16 w-72 text-white text-xl uppercase transition-colors hover:bg-gray-800"
        >
          Create Match
        </button>
        <button
          onClick={open}
          className="bg-gray-900 rounded h-16 w-72 text-white text-xl uppercase transition-colors hover:bg-gray-800"
        >
          Join Match
        </button>
      </div>

      {isOpen && <JoinMatchModal close={close} />}
    </>
  );
};

export default Home;
