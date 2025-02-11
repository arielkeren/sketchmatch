import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import Image from "next/image";
import { RiUser3Fill } from "react-icons/ri";

const Header: React.FC = () => {
  const user = useAuth();

  const logIn = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logOut = () => signOut(auth);

  return (
    <header className="h-24 flex justify-between items-center bg-gray-50 drop-shadow-lg p-5">
      <Link
        href="/"
        className="text-4xl font-bold bg-gray-900 text-white py-3 px-12 rounded drop-shadow-lg select-none duration-200 hover:bg-gray-300 hover:text-black"
      >
        SketchMatch
      </Link>
      {user.username ? (
        <div className="flex flex-col items-center gap-1">
          <Image
            src={user.photo}
            alt=""
            height="48"
            width="48"
            className="rounded-full drop-shadow-lg select-none"
          />
          <button
            onClick={logOut}
            className="flex justify-center items-center h-5 w-24 font-medium text-lg rounded uppercase select-none hover:bg-gray-200"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="flex justify-center items-center bg-gray-900 rounded-full h-12 w-12 drop-shadow-lg">
            <RiUser3Fill className="text-3xl text-white" />
          </div>
          <button
            onClick={logIn}
            className="flex justify-center items-center h-5 w-24 font-medium text-lg rounded uppercase select-none hover:bg-gray-200"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
