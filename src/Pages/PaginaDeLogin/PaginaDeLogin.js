import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { BASE_URL } from "../../Contants/Contants";
import { irParaCadastro, irParaHome } from "../../Router/Coordinator";
import { Input } from "@chakra-ui/react";
import Header from "../../Components/Headers/Header";
import imagens from "../../imagens/logo-invert.png";
import { Button, Flex, Image, Box } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'


const PaginaDeLogin = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, onChange, clear] = useForm({ email: "", password: "" });

  const login = () => {
    axios
      .post(`${BASE_URL}/login`, form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        if (res.data.user.hasAddress === true) {
          navigate("/")
        } else {
          navigate("/cadastro")
        }
        clear();
      })
      .catch((err) => {
        alert("Usuario não encontrado")
        console.log(err.res)
        clear();
      })
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    login(navigate)
  }



  return (
    <div>


      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        padding={"16px"}
        h={"70vh"}
      >
      <Image mb={"50px"} src={imagens} margin={"auto"}
      /><br />

      <Flex direction={"column"}></Flex>
      <form onSubmit={onSubmitForm}>

        <Input type={"email"}
          placeholder="E-mail"
          name={"email"}
          value={form.email}
          onChange={onChange}
          required
          id="email"
          backgroundColor={"white"}
          borderRadius={"4px"}
          fontSize={"0.9em"}
          fontWeight={"400"}
          mb={"10px"}
        />
        <Input type={"password"}
          placeholder="Senha"
          name={"password"}
          value={form.password}
          onChange={onChange}
          required
          id="password"
          backgroundColor={"white"}
          borderRadius={"4px"}
          fontSize={"0.9em"}
          fontWeight={"400"}
          mb={"10px"}
        />
        <Button
          w="full"
          mt={4}
          fontFamily={"'Roboto', sans-serif"}
          bg={"#5cb646"}
          type={"submit"}
        >
          Entrar
        </Button>

        <Button
          w="full"
          mt={2}
          fontFamily={"'Roboto', sans-serif"}
          bg="#5cb646" onClick={() => irParaCadastro(navigate)}>Cadastre-se</Button>

      </form>
      </Flex>
    </div>
  );
}

export default PaginaDeLogin