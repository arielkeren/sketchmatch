import { TbLoader } from "react-icons/tb";

const Loading: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex justify-between items-center bg-gray-900 h-20 w-96 px-10 rounded drop-shadow-lg">
      <TbLoader className="text-4xl text-white animate-spin" />
      <h1 className="text-4xl font-bold text-white select-none">SketchMatch</h1>
    </div>
  </div>
);

export default Loading;
