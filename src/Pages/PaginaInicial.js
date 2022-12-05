import { Container, Flex, Image } from "@chakra-ui/react";
import react from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { irParaHome, irParaLogin } from "../Router/Coordinator";
import logo from "../../src/imagens/logo-future-eats.png";

const PaginaInicial = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        irParaHome(navigate);
      } else {
        irParaLogin(navigate);
      }
    }, 5000);
  }, []);

  return (
    <>
      <Container bg={"black"}>
        <Flex justify={"center"} align={"center"} h={"100vh"}>
          <Image src={logo} />
        </Flex>
      </Container>
    </>
  );
};

export default PaginaInicial;
