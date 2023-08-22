import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBNB",
  description: "AirBNB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
