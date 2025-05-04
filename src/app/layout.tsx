// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Provider from "./provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <header>
            <Navbar />
          </header>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
