import React, { useContext, useEffect, useState } from "react";
import BarraNavegacao from "../../Components/BarraDeNavegacao/BarraNavegacao";
import CardProduto from "../../Components/CardProduto/CardProduto";
import Header from "../../Components/Headers/Header";
import GlobalContext from "../../Global/GlobalContext";
import {
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  Stack,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../Contants/Contants";

const PaginaPedido = () => {
  const { states, setters } = useContext(GlobalContext);
  const { carrinho, perfil, detalhes, pedidoEmAndamento, detalhesPedido } = states;
  const { setCarrinho, setPerfil, setPedidoEmAndamento, setDetalhesPedido } = setters
  const [pagamento, setPagamento] = useState()

  useEffect(() => {
    buscarInformacoes()
  }, [])

  const onClickRemoverProduto = (item) => {
    if (item.quantity > 1) {
      const novoCarrinho = [...carrinho]
      for (let produto of novoCarrinho) {
        if (produto.id === item.id) {
          produto.quantity -= 1
        }
      }
      setCarrinho(novoCarrinho)
    } else {
      const novoCarrinho = carrinho.filter((produto) => {
        return produto.id !== item.id
      })
      setCarrinho(novoCarrinho)
    }
  }

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

  const onClickConfirmarPedido = () => {
    const url = `${BASE_URL}/restaurants/${detalhes.id}/order`
    const { token } = localStorage
    const body = {
      products: carrinho,
      paymentMethod: pagamento
    }

    axios
      .post(url, body, {
        headers: {
          auth: token
        }
      })
      .then((response) => {
        setDetalhesPedido(response.data.order)
        setPedidoEmAndamento(true)
        setCarrinho([])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const itemCarrinho = carrinho.map((item) => {
    return (
      <Flex
        width="100%"
        maxW='328px'
        border="1px solid #b8b8b8"
        borderRadius="8px"
        key={item.id}
      >
        <Box
          minW="96px"
          borderRadius="8px 0 0 8px"
          backgroundSize={"cover"}
          backgroundPosition="center"
          backgroundImage={item.photoUrl}
        />

        <Flex direction="column" maxWidth="232px" grow="1">
          <Flex justify="flex-end" width="100%">
            <Flex
              justify="center"
              align="center"
              width="30px"
              height="30px"
              border="1px solid #5cb646"
              borderRadius="0 8px 0 8px"
              fontSize="12px"
              color="#5cb646"
              position="relative"
              left="1px"
              bottom="1px"
            >
              <span>{item.quantity}</span>
            </Flex>
          </Flex>

          <Flex direction="column" padding="0 16px" width="100%">
            <Box
              fontWeight="semibold"
              as="h3"
              color="#5CB646"
              marginBottom="8px"
            >
              {item.name}
            </Box>
            <Box
              fontSize="12px"
              color="#b8b8b8"
              height="30px"
              marginBottom="4px"
              as="span"
            >
              {item.description}
            </Box>
            <Box fontWeight="semibold" as="h3">
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Box>
          </Flex>

          <Box display="flex" justifyContent="flex-end" width="100%">
            <Box
              as="button"
              width="90px"
              height="30px"
              border="1px solid #e02020"
              borderRadius="8px 0 8px 0"
              fontSize="12px"
              color="#e02020"
              position="relative"
              left="1px"
              bottom="-1px"
              onClick={() => onClickRemoverProduto(item)}
            >
              remover
            </Box>
          </Box>
        </Flex>
      </Flex>
    );
  });

  const onChangeMetodoDePagamento = (event) => {
    setPagamento(event.target.value)
  }

  let valorSubTotal = 0

  for (let item of carrinho) {
    valorSubTotal = item.price * item.quantity + valorSubTotal
  }

  let valorFrete = detalhes.shipping

  let valorTotal = valorFrete + valorSubTotal

  if (itemCarrinho.length === 0) {
    return (
      <>
        <Header titulo="Carrinho" />
        <Flex
          direction='column'
          width='100vw'
          marginBottom='50px'
          fontFamily={"'Roboto', sans-serif"}
        >
          <Flex fontSize="16px" direction="column" bg="#eeeeee">
            <Flex justify={"space-between"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Box m={"5px"} color="gray" as="p">
                  Endereço de entrega: <br></br>
                  <b>{perfil.address}</b>
                </Box>
              </Box>
            </Flex>
          </Flex>

          <Flex direction={"column"} align={"center"}>
            <Box mb={"35px"} mt={"10px"}>
              Carrinho Vazio
            </Box>

            <Flex justify={"space-between"} padding={"0 50px"}>
              <Box display={"flex"} mr={"18px"}>
                <Text>Valor Total R$ {valorSubTotal},00</Text>
              </Box>

              <Box>
                <Text>Valor Frete R$ 0,0</Text>
              </Box>
            </Flex>
          </Flex>

          <Stack mt={"50px"}>
            <RadioGroup m={"10px"}>
              Formas de Pagamento<br></br>
              <Divider borderBottomColor={"black"}></Divider>
              <Box m={"10px"}>
                <Radio mt={"50px"} isDisabled>Dinheiro</Radio><br></br>
                <Radio mt={"50px"} isDisabled>Cartão de Crédito</Radio>
              </Box>
            </RadioGroup>
          </Stack>
        </Flex>
        <BarraNavegacao />
      </>
    );
  }

  return (
    <>
      <Header titulo="Carrinho" />
      <Flex
        direction='column'
        width='100vw'
        marginBottom='50px'
        fontFamily={"'Roboto', sans-serif"}
      >


        <Flex fontSize="16px" direction="column" bg="#eeeeee">
          <Flex justify={"space-between"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box m={"5px"} color="gray" as="p">
                Endereço de entrega: <br></br>
                <b>{perfil.address}</b>
              </Box>
            </Box>
          </Flex>
        </Flex>

        <Box m={"12px"}>
          <Text fontSize={"20px"} color={"#5cb646"}>{detalhes.name}</Text>
          <Text fontSize={"16px"} color={"GrayText"}>{detalhes.address}</Text>
          <Text fontSize={"16px"} color={"GrayText"}>{detalhes.deliveryTime}</Text>
        </Box>

        <Flex
          direction='column'
          align='center'
          width='100%'
          gap='8px'
          padding='16px'
        >
          {itemCarrinho}
        </Flex>

        <Flex direction={"column"} m={"20px"}>
          <Flex>
            <Box display={"column"}>
              <Text m={"5px"}>Valor Subtotal = R$ {valorSubTotal},00</Text>
              <Text m={"5px"}>Valor do Frete = R$ {valorFrete}</Text>
              <Text m={"5px"} color={"#5cb646"}><b>Valor Total = R$ {valorTotal}</b></Text>
            </Box>
          </Flex>
        </Flex>

        <Stack direction={"column"}>
          <Text m={"10px"}>Formas de Pagamento</Text>
          <Divider borderBottomColor={"black"}></Divider>
          <RadioGroup>
            <Box m={"10px"} padding={"6px"}>
              <input onChange={onChangeMetodoDePagamento} type="radio" id="money" value="money" checked={pagamento === "money"} />
              <label for="money">Dinheiro</label><br></br>
              <input onChange={onChangeMetodoDePagamento} type="radio" id="creditcard" value="creditcard" checked={pagamento === "creditcard"} />
              <label for="creditcard">Cartão de Crédito</label>
            </Box>
          </RadioGroup>
          <Flex padding='16px'>
            <Button bg="#5cb646" width='100%' onClick={onClickConfirmarPedido}>Confirmar</Button>
          </Flex>
        </Stack>
      </Flex>
      <BarraNavegacao />
    </>
  );
};

export default PaginaPedido;
