import { Box, Flex } from "@chakra-ui/react"
import React from "react"

const CardProduto = (props) => {

  return (
    <Flex
      width='100%'
      border='1px solid #B8B8B8'
      borderRadius='8px'
      key={props.id}
    >
      <Box
        minW='96px'
        borderRadius='8px 0 0 8px'
        backgroundSize={'cover'}
        backgroundPosition='center'
        backgroundImage={props.photoUrl}
      />
      <Flex direction='column' maxWidth='232px' grow='1'>
        {/* <Flex justify='flex-end' width='100%'>
          <Flex
            justify='center'
            align='center'
            width='30px'
            height='30px'
            border='1px solid #5CB646'
            borderRadius='0 8px 0 8px'
            fontSize='12px'
            color='#5CB646'
            position='relative'
            left='1px'
            bottom='1px'
          >
            <span>{props.quantidade}</span>
          </Flex>
        </Flex> */}
        <Flex direction='column' padding='0 16px' width='100%'>
          <Box fontWeight='semibold' as='h3' color='#5CB646' marginTop='30px' marginBottom='8px'>
            {props.name}
          </Box>
          <Box fontSize='12px' color='#B8B8B8' height='30px' marginBottom='4px' as='span'>
            {props.description}
          </Box>
          <Box fontWeight='semibold' as='h3'>
            {props.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Box>
        </Flex>
        {
          props.idProdutos.includes(props.id) ?
            (<Box display='flex' justifyContent='flex-end' width='100%'>
              <Box
                as='button'
                width='90px'
                height='30px'
                border='1px solid #e02020'
                borderRadius='8px 0 8px 0'
                fontSize='12px'
                color='#e02020'
                position='relative'
                left='1px'
                bottom='-1px'
                onClick={props.onClickRemoverProduto}
              >
                remover
              </Box>
            </Box>) :
            (<Box display='flex' justifyContent='flex-end' width='100%'>
              <Box
                as='button'
                width='90px'
                height='30px'
                border='1px solid #5CB646'
                borderRadius='8px 0 8px 0'
                fontSize='12px'
                color='#5CB646'
                position='relative'
                left='1px'
                bottom='-1px'
                onClick={props.onAddProduct}
              >
                adicionar
              </Box>
            </Box>)
        }

      </Flex>
    </Flex>
  )
}
export default CardProduto