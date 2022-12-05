import React, { useEffect, useContext, useState } from 'react'

import GlobalContext from '../../Global/GlobalContext'
import { useParams } from 'react-router-dom'
import CardProduto from '../../Components/CardProduto/CardProduto'
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react"
import Header from '../../Components/Headers/Header'
import BarraNavegacao from '../../Components/BarraDeNavegacao/BarraNavegacao'

const PaginaDetalhesRestaurante = () => {

  const pathParams = useParams()

  const { states, requests, setters } = useContext(GlobalContext)

  const { carrinho } = states
  const { setCarrinho } = setters
  const [selectedProduct, setSelectedProduct] = useState({});
  const [valor, setValor] = useState(1)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const categorias = []

  const pegaCategorias = () => {
    states.detalhes.products && states.detalhes.products
      .map((categoria) => {
        categorias.push(categoria.category)
      })
  }
  pegaCategorias()

  const categoriasSemRepetir = [...new Set(categorias)]


  const onClickAdicionarParaCarrinho = (produto) => {
    const novoCarrinho = [...carrinho]
    let temNoCarrinho = false
    for (let item of novoCarrinho) {
      if (item.id === produto.id) {
        item.quantity += valor
        temNoCarrinho = true
      }
    }
    if (temNoCarrinho === false) {
      novoCarrinho.push({ ...produto, quantity: valor })
    }
    setCarrinho(novoCarrinho)
    onClose()
  }

  const onClickRemoverProduto = (item) => {
    if(item.quantity > 1){
      const novoCarrinho = [...carrinho]
      for(let produto of novoCarrinho){
        if(produto.id === item.id){
          produto.quantity -= 1
        }
      }
      setCarrinho(novoCarrinho)
    }else {
      const novoCarrinho = carrinho.filter((produto) => {
        return produto.id !== item.id
      })
      setCarrinho(novoCarrinho)
    }
  }

  const idProdutos = []
  const pegaId = () => {
    states.carrinho && states.carrinho
      .map((item) => { idProdutos.push(item.id) })
  }
  pegaId()


  const onChangevalor = (event) => {
    setValor(event.target.value)
  }

  const onAddProduct = (produto) => {
    setSelectedProduct(produto)
    onOpen()
  }

  
  useEffect(() => {
    requests.pegarDetalhes(pathParams.id)
  }, [states.carrinho])


  return (
    <>
    <Header titulo="Restaurante"/>
    
    <Flex
      direction='column'
      align='center'
      width='100vw'
      padding='16px'
      marginBottom='50px'
      fontFamily={"'Roboto', sans-serif"}
    >
      <Box
        width='100%'
        maxW='328px'
        height='120px'
        borderRadius='8px 8px 0 0'
        marginBottom='12px'
        backgroundSize={'cover'}
        backgroundPosition='center'
        backgroundImage={states.detalhes.logoUrl}
      />
      <Box width='100%' maxW='328px' color='#b8b8b8'>
        <Box fontWeight='semibold' as='h3' color='#5CB646'>{states.detalhes.name}</Box>
        <Box marginBottom='16px'>
          <p>{states.detalhes.category}</p>
          <Box display='flex' gap='16px'>
            <p>{states.detalhes.deliveryTime} min</p>
            <p>Frete: R$ {states.detalhes.shipping},00</p>
          </Box>
          <p>{states.detalhes.address}</p>
        </Box>
      </Box>

      <Flex
        direction='column'
        align='center'
        width='100%'
        maxW='328px'
        gap='8px'
      >
        {categoriasSemRepetir.map((categoria) => {
          return (
            <Flex
              direction='column'
              align='flex-start'
              width='100%'
              maxW='328px'
              gap='8px'
              key={categoria}
            >
              <span>{categoria}</span>
              <Box height='1px' width='100%' bg='black' />

              {states.detalhes.products && states.detalhes.products
                .filter((produto) => {
                  return produto.category === categoria
                })
                .map((produto) => {
                  return (
                    <CardProduto
                      key={produto.id}
                      id={produto.id}
                      photoUrl={produto.photoUrl}
                      name={produto.name}
                      description={produto.description}
                      price={produto.price}
                      produtos={states.detalhes.products}
                      valor={
                        idProdutos.includes(produto.id) ?
                        (states.carrinho.quantity) : ""
                      }
                      idProdutos={idProdutos}
                      onClickRemoverProduto={() => onClickRemoverProduto(produto)}
                      onAddProduct={() => onAddProduct(produto)}
                    />
                  )})
              }
            </Flex>
          )
        })}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selecione a quantidade desejada</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select value={valor} onChange={onChangevalor}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color='#5CB646' variant='ghost' mr={3} onClick={() => onClickAdicionarParaCarrinho(selectedProduct)}>
              ADICIONAR AO CARRINHO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
    <BarraNavegacao />
    </>
  )
}

export default PaginaDetalhesRestaurante