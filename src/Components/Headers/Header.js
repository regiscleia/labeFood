import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import seta from "../../imagens/back@2x.png";
import { irParaLogin, voltar } from "../../Router/Coordinator";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <SimpleGrid
      fontFamily={"Roboto-Regular"}
      borderBottom={"1px"}
      borderBottomColor={"#b8b8b8"}
      columns={3}
      spacing={2}
      w="full"
    >
      <GridItem colSpan={1}>
        <Image
          boxSize={"2em"}
          src={seta}
          onClick={() => voltar(navigate)}
          padding={"5px"}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Heading mt={"3px"} fontSize={"1.3em"}>
          {props.titulo}
        </Heading>
      </GridItem>

      <GridItem></GridItem>
    </SimpleGrid>
  );
};
export default Header;
