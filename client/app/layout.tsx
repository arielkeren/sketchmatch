import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "./components/AuthContextProvider";
import ServerContextProvider from "./components/ServerContextProvider";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SketchMatch",
  description: "Put your sketching skills to the test",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className={font.className}>
      <AuthContextProvider>
        <ServerContextProvider>{children}</ServerContextProvider>
      </AuthContextProvider>
    </body>
  </html>
);

export default RootLayout;
