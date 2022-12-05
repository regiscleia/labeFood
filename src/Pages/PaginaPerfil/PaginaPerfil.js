import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { BASE_URL } from "../../Contants/Contants";
import {
  irParaEditarPerfil,
  irParaEditarEndereco,
  irParaLogin,
} from "../../Router/Coordinator";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Headers/Header";
import { Box, Button, Divider, Flex, HStack, Image, Text } from "@chakra-ui/react";
import editar from "../../imagens/edit.png";
import BarraNavegacao from "../../Components/BarraDeNavegacao/BarraNavegacao";
const PaginaPerfil = () => {
  const [perfil, setPerfil] = useState({
    id: "",
    name: "",
    email: "",
    cpf: "",
    hasAdress: true,
    address: "",
  });
  const [pedidos, setPedidos] = useState([]);

  const navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem("token")
    irParaLogin(navigate)
  }

  useEffect(() => {
    buscarInformacoes();
    buscarHistoricoDePedidos();
  }, []);
  const buscarInformacoes = () => {
    const url = `${BASE_URL}/profile`;
    const { token } = localStorage;
    axios
      .get(url, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        setPerfil(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const buscarHistoricoDePedidos = () => {
    const url = `${BASE_URL}/orders/history`;
    const { token } = localStorage;
    axios
      .get(url, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        setPedidos(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickIrParaEditarPerfil = () => {
    irParaEditarPerfil(navigate);
  };

  const onClickIrParaEditarEndereco = () => {
    irParaEditarEndereco(navigate);
  };

  const listaDePedido = pedidos.map((pedido) => {
    return (
      <Box
        border="1px solid #b8b8b8"
        borderRadius="8px"
        width="100%"
        padding='16px'
        gap='8px'
        key={pedido.totalPrice}
      >
        <Text color='#5cb646'>{pedido.restaurantName}</Text>
        <Text fontSize='12px'>Data: {new Date(pedido.createdAt).toLocaleDateString()}</Text>
        <Text fontWeight='bold'>SubTotal: {pedido.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </Box>
    );
  });

  return (
    <>
      <Header titulo="Meu Perfil" />

      <Flex fontSize="16px" direction={"column"} fontFamily={"'Roboto', sans-serif"}>
        < Button bg="#eeeeee" onClick={logout}>Sair</Button>
        <Flex justify={"space-between"}>

          <Box m={"10px"} display={"flex"} flexDirection={"column"}>
            <Text>{perfil.name}</Text>
            <Text>{perfil.email}</Text>
            <Text>{perfil.cpf}</Text>
          </Box>
          <Box>
            <Image src={editar} onClick={onClickIrParaEditarPerfil} />
          </Box>
        </Flex>

        <Flex fontSize="16px" direction="column" bg="#eeeeee">
          <Flex justify={"space-between"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box m={"5px"} color="gray" as="p">
                Endereço cadastrado
              </Box>
              <Text m="5px"> {perfil.address}</Text>
            </Box>
            <Box>
              <Image src={editar} onClick={onClickIrParaEditarEndereco} />
            </Box>
          </Flex>
        </Flex>

        <Flex
          direction='column'
          width='100vw'
          padding='16px'
          marginBottom='50px'
        >
          <Box fontSize={"16px"} marginBottom='8px' as="p">
            Histórico de compras:
          </Box>
          <Divider borderBottomColor={"gray"} orientation='horizontal' />
          <Flex
            direction='column'
            align='center'
            width='100%'
            gap='8px'
            marginTop='9px'
          >
          {listaDePedido}
          </Flex>
        </Flex>

      </Flex>
      <BarraNavegacao />
    </>
  );
}

export default PaginaPerfil;
