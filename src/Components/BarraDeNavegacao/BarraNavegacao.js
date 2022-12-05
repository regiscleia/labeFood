import {
  Box,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import react from "react";
import home from "../../imagens/homepage@2x.png";
import shoppingCart from "../../imagens/shopping-cart@2x.png";
import avatar from "../../imagens/avatar@2x.png";
import { useNavigate } from "react-router-dom";
import {
 
  irParaHome,
  irPedido,
  irPerfil,
} from "../../Router/Coordinator";

const BarraNavegacao = () => {
  const navigate = useNavigate();

  return (
    <SimpleGrid
      columns={3}
      h="50px"
      bg="white"
      py="1em"
      borderTop={"1px"}
      borderColor="lightgray"
      w="full"
      pos={"fixed"}
      bottom={0}
    >
      <Flex justify={"center"}>
        <Image
          src={home}
          onClick={() => irParaHome(navigate)}
          width="27px"
          height="27px"
        />
      </Flex>
      <Flex justify={"center"}>
        <Image
          src={shoppingCart}
          onClick={() => irPedido(navigate)}
          width="27px"
          height="27px"
        />
      </Flex>
      <Flex justify={"center"}>
        <Image
          src={avatar}
          onClick={() => irPerfil(navigate)}
          width="27px"
          height="27px"
        />
      </Flex>
    </SimpleGrid>
  );
};
export default BarraNavegacao;
