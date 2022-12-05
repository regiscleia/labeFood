import React from "react";
import { Router } from "./Router/Routes";
import { ChakraProvider, Container } from "@chakra-ui/react";
import GlobalState from "./Global/GlobalState";
import CardPedido from "./Components/CardPedido/CardPedido";

const App = () => {
  return (
    <GlobalState>
      <ChakraProvider>
        <Container p="0">
          <Router />
          <CardPedido/>
        </Container>
      </ChakraProvider>
    </GlobalState>
  );
};

export default App;
