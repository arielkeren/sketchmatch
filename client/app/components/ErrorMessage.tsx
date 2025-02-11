import { useEffect, useState } from "react";

type Props = {
  message: string;
  close: () => void;
};

const ErrorMessage: React.FC<Props> = ({ message, close }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setVisible(true), 100);

    const endTimeout = setTimeout(() => {
      setVisible(false);
      setTimeout(close, 500);
    }, 3000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
    };
  }, [close]);

  return (
    <div
      className={`fixed top-0 left-1/2 -translate-x-1/2 bg-red-600 py-5 px-20 drop-shadow-lg rounded transition-transform duration-500 ${
        visible ? "translate-y-20" : "-translate-y-full"
      }`}
    >
      <p className="text-white text-lg">{message}</p>
    </div>
  );
};

export default ErrorMessage;
