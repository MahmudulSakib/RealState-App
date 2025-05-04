"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
  );
}
