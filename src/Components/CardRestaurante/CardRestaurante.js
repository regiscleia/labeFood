import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, VStack } from "@chakra-ui/react";

import GlobalContext from "../../Global/GlobalContext";
import { irParaDetalhesRestaurante } from "../../Router/Coordinator";

const CardRestaurante = (props) => {
  const navigate = useNavigate();
  const { states } = useContext(GlobalContext);

  return (
    <>
      <VStack
        direction='column'
        align='flex-start'
        width='100%'
        maxW='328px'
        gap='8px'
      >
        {states.restaurantes
          .filter((restaurante) => {
            return (
              props.categoria === "" || restaurante.category === props.categoria
            );
          })
          .map((restaurante) => {
            return (
              <Box
                className="restaurant-card"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                width="100%"
                border="1px solid #b8b8b8"
                borderRadius="8px"
                key={restaurante.id}
                onClick={() =>
                  irParaDetalhesRestaurante(navigate, restaurante.id)
                }
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
                <Box padding="16px">
                  <Box fontWeight="semibold" as="h3" color="#5CB646">
                    {restaurante.name}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    color="#b8b8b8"
                  >
                    <p>{restaurante.deliveryTime} min</p>
                    <p>Frete: R$ {restaurante.shipping},00</p>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </VStack>
    </>
  );
};

export default CardRestaurante;
