import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from '../../Global/GlobalContext'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Contants/Contants";
import { irParaDetalhesRestaurante } from "../../Router/Coordinator"
import { CardProdutoContainer } from "./styled"
import { Box, Button, Flex, Image } from "@chakra-ui/react"
import { Input } from '@chakra-ui/react'
import Header from "../../Components/Headers/Header";

const PaginaBuscarRestaurante = () => {

  const navigate = useNavigate()
  const [restaurantes, setRestaurantes] = useState([])
  const [buscaRestaurante, setBuscaRestaurante] = useState("")

  const getRestaurante = () => {

    const headers = {
      headers: {
        auth: localStorage.getItem('token'),
      }
    }
    axios.get(`${BASE_URL}/restaurants`, headers)
      .then((res) => {
        setRestaurantes(res.data.restaurants);
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      })
  }
  useEffect(() => {
    getRestaurante()
  }, [])

  const filtrandoRestaurantes = restaurantes.filter((restaurante) => {
    if (buscaRestaurante == "") {
      return restaurante
    } else if (restaurante.name.toLowerCase().includes(buscaRestaurante.toLowerCase())) {
      return restaurante
    }
  })

    .map((restaurante) => {
      return (
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          width='100%'
          border='1px solid #b8b8b8'
          borderRadius='8px'
          key={restaurante.id}
          onClick={() => irParaDetalhesRestaurante(navigate, restaurante.id)}
        >
          <Box
            width='100%'
            maxW='328px'
            height='120px'
            borderRadius='8px 8px 0 0'
            backgroundSize={'cover'}
            backgroundPosition='center'
            backgroundImage={restaurante.logoUrl}
          />
          <Box padding='16px'
          >
            <Box fontWeight='semibold' as='h3' color='#5CB646'>{restaurante.name}</Box>
            <Box display='flex' justifyContent='space-between' color='#b8b8b8'>
              <p>{restaurante.deliveryTime} min</p>
              <p>Frete: R$ {restaurante.shipping},00</p>
            </Box>
          </Box>
        </Box>


      )
    })

  return (
    <div >
      <Header titulo="FutureEats" />
      <Flex
        direction='column'
        align='center'
        width='100vw'
        padding='16px'
      >
        <Input
          size='md' type="text"
          placeholder="Buscar por Restaurante"
          onChange={(event) => {
            setBuscaRestaurante(event.target.value)
          }} />
        <br /><br />
        <Flex
          direction='column'
          align='center'
          width='100%'
          maxW='328px'
          gap='8px'
        >
        {filtrandoRestaurantes}
        </Flex>
      </Flex>
    </div>
  )
}

export default PaginaBuscarRestaurante