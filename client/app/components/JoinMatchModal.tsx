import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useServer from "../hooks/useServer";
import ErrorMessage from "./ErrorMessage";

type Props = {
  close: () => void;
};

const JoinMatchModal: React.FC<Props> = ({ close }) => {
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement | null>(null);
  const server = useServer();
  const router = useRouter();

  const joinMatch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.current || !server || server.disconnected) return;

    if (input.current.value.length !== 6)
      return setMessage("Match code must be 6 characters long");

    server.emit("check", {
      code: input.current.value,
    });

    server.on("check", data => {
      if (!input.current) return;
      if (!data.message) return router.push(`match/${input.current.value}`);
      setMessage(data.message);
    });
  };

  const closeError = () => setMessage("");

  const stopClose = (event: React.MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div
          onClick={stopClose}
          className="relative flex flex-col justify-center items-center gap-2 h-1/3 w-2/3 bg-white p-4 rounded-lg"
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 p-1 rounded transition-colors hover:bg-gray-200"
          >
            <IoMdClose className="text-2xl" />
          </button>
          <h2 className="text-2xl font-bold">Join Match</h2>
          <form
            onSubmit={joinMatch}
            className="flex flex-col items-center gap-2"
          >
            <input
              ref={input}
              autoFocus
              placeholder="Enter match code"
              className="border-2 border-gray-300 p-2 rounded-lg w-72 outline-none transition-colors focus:border-gray-400"
            />
            <input
              type="submit"
              value="Join"
              className="bg-gray-900 rounded py-2 px-16 text-white text-xl uppercase drop-shadow-lg cursor-pointer transition-colors hover:bg-gray-800"
            />
          </form>
        </div>
      </div>

      {message !== "" && <ErrorMessage message={message} close={closeError} />}
    </>
  );
};

export default JoinMatchModal;
