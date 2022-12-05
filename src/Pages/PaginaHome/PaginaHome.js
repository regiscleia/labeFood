import BarraNavegacao from "../../Components/BarraDeNavegacao/BarraNavegacao";
import Header from "../../Components/Headers/Header";
import React, { useEffect, useContext, useState } from "react";
import GlobalContext from "../../Global/GlobalContext";
import CardRestaurante from "../../Components/CardRestaurante/CardRestaurante";
import FiltroCategoria from "./FiltroCategoria";
import { Flex, VStack, HStack, SimpleGrid, Button, Input } from "@chakra-ui/react";
import { irParaBusca, irParaCadastro } from "../../Router/Coordinator";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  
  const { states, setters, requests } = useContext(GlobalContext);

  const [categoria, setCategoria] = useState("")

  useEffect(() => {
    requests.pegarRestaurantes()
  }, [])

  return (
    <>
      <Header titulo="FutureEats" />
      <Flex
        direction='column'
        align='center'
        width='100vw'
        padding='16px'
        marginBottom='50px'
        fontFamily={"'Roboto', sans-serif"}
      >
        
        <Input 
         backgroundColor={"white"}
         size='md'
          mb={"5px"} 
          w="full"
          placeholder="Buscar por Restaurante" 
          alt="Restarante-foto" 
          onClick={() => irParaBusca(navigate)} />          

        <HStack w="full">
          <FiltroCategoria setCategoria={setCategoria} />
        </HStack>

        <Flex
          direction='column'
          align='center'
          width='100%'
          maxW='328px'
          gap='8px'
        >
          <CardRestaurante categoria={categoria} />
        </Flex>      
      </Flex>
      <BarraNavegacao />
    </>
  )
}

export default Home