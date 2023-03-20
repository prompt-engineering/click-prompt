"use client";

import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const theme = extendTheme({
    components: {
      Drawer: {
        sizes: {
          "2xl": { dialog: { maxW: "8xl" } },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      {children}
    </ChakraProvider>
  );
};
