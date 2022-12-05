import { Box, Button, Flex, Image, Input } from "@chakra-ui/react";
import React from "react";
import useForm from "../../Hooks/useForm";
import axios from "axios";
import imagens from "../../imagens/logo-invert.png";
import { useNavigate } from "react-router-dom";
import { irParaLogin } from "../../Router/Coordinator";
import Header from "../../Components/Headers/Header";


const PaginaEditarEndereco = () => {

  const navigate = useNavigate()
  const [form, onChange, clear] = useForm({
    street: "",
    number: "",
    neighbourhood: "",
    city: "",
    state: "",
    complement: "",
  });

  const cadastrarEndereco = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = { headers: { auth: token } };
    axios
      .put(
        "https://us-central1-missao-newton.cloudfunctions.net/futureEatsA/address",
        form,
        headers
      )
      .then((res) => {
        clear();
        localStorage.setItem("token", res.data.token);
        alert("Endereço cadastrado com sucesso");
        irParaLogin(navigate)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
    <Header/>
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      padding={"0 0 36px"}
      h={"100vh"}
      fontFamily={"'Roboto', sans-serif"}
    >
      <Box
        as="h1"
        fontSize={"20px"}
        fontWeight={"bold"}
        alignSelf={"center"}
        mb={"10px"}
      >
        Meu Endereço
      </Box>
      <form onSubmit={cadastrarEndereco}>
        <Flex direction={"column"}>
          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            name={"street"}
            value={form.street}
            onChange={onChange}
            placeholder="Rua"
            required
            type={"text"}
          />

          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            required
            name={"number"}
            type="number"
            placeholder="Numero"
            value={form.number}
            onChange={onChange}
          />
          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            required
            name={"neighbourhood"}
            type="text"
            placeholder="Bairro"
            value={form.neighbourhood}
            onChange={onChange}
          />

          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            required
            name={"city"}
            placeholder="Cidade"
            type="text"
            value={form.city}
            onChange={onChange}
          />
          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            required
            name={"state"}
            placeholder="Estado"
            type="text"
            value={form.state}
            onChange={onChange}
            w={"360px"}
            padding={"0 16px 8px"}
          />
          <Input
            backgroundColor={"white"}
            borderRadius={"4px"}
            fontSize={"0.9em"}
            fontWeight={"400"}
            mb={"10px"}
            name={"complement"}
            placeholder="Complemento"
            type="text"
            value={form.complement}
            onChange={onChange}
            mt={"5px"}
          />

          <Button bg="#5cb646" type="submit">
            Salvo
          </Button>
        </Flex>
      </form>
    </Flex>
    </>
  );
};

export default PaginaEditarEndereco;
