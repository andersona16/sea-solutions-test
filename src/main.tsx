import React from "react";
import ReactDOM from "react-dom/client";
import { Sections } from "./pages/Main";
import { ChakraProvider } from "@chakra-ui/react";
import { SectorsProvider } from "./hooks/useSectors";
import GlobalStyle from "./styles/global";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SectorsProvider>
      <ChakraProvider>
        <Sections />
        <GlobalStyle />
      </ChakraProvider>
    </SectorsProvider>
  </React.StrictMode>
);
