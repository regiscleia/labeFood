import { Button, Flex, Image, Input } from "@chakra-ui/react";
import React from "react";
import { irParaEditarEndereco } from "../../Router/Coordinator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imagens from "../../imagens/logo-invert.png";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Header from "../../Components/Headers/Header";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("nome incorreto"),
  email: Yup.string().email().required(),
  cpf: Yup.string().required("CPF invalido"),
  password: Yup.string().required().min(8, "minimo 8 caracteres"),
  confirmPwd: Yup.string()
    .min(8, "minimo 8 caracteres")
    .required("Digite a mesma senha")
    .oneOf([Yup.ref("password")], "Deve ser a mesma senha que a anterior"),
});

const PaginaDeCadastro = () => {
  const navigate = useNavigate();

  const onClickCadastrar = (values, actions) => {
    axios
      .post(
        "https://us-central1-missao-newton.cloudfunctions.net/futureEatsA/signup",
        values
      )
      .then((response) => {
        actions.setSubmitting(false);
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        irParaEditarEndereco(navigate);
      })
      .catch((err) => {
        actions.setSubmitting(false);
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        } else {
          alert(err);
        }
      });
  };

  return (
    <>
      <Header />
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        padding={"1em"}
        h={"100vh"}
        fontFamily={"'Roboto', sans-serif"}
      >
        <Image mb={"50px"} src={imagens} />
        <h1>Cadastrar</h1>
        <Flex direction={"column"}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              cpf: "",
              password: "",
              confirmPwd: "",
            }}
            onSubmit={onClickCadastrar}
            validationSchema={SignupSchema}
          >
            {(props) => (
              <Form>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Nome"
                        backgroundColor={"white"}
                        borderRadius={"4px"}
                        fontSize={"0.9em"}
                        fontWeight={"400"}
                        mb={"10px"}
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        {...field}
                        id="email"
                        backgroundColor={"white"}
                        borderRadius={"4px"}
                        fontSize={"0.9em"}
                        fontWeight={"400"}
                        mb={"10px"}
                        type="email"
                        placeholder="Email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="cpf">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.cpf && form.touched.cpf}
                    >
                      <FormLabel htmlFor="cpf">CPF</FormLabel>
                      <Input
                        {...field}
                        id="cpf"
                        backgroundColor={"white"}
                        borderRadius={"4px"}
                        fontSize={"0.9em"}
                        fontWeight={"400"}
                        mb={"10px"}
                        placeholder="CPF"
                      />
                      <FormErrorMessage>{form.errors.cpf}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <Input
                        {...field}
                        id="password"
                        backgroundColor={"white"}
                        borderRadius={"4px"}
                        fontSize={"0.9em"}
                        fontWeight={"400"}
                        mb={"10px"}
                        placeholder="Senha"
                        type="password"
                        w={"360px"}
                        padding={"0 16px 8px"}
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="confirmPwd">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.confirmPwd && form.touched.confirmPwd
                      }
                    >
                      <FormLabel htmlFor="confirmPwd">
                        Confirme a Senha
                      </FormLabel>
                      <Input
                        {...field}
                        id="confirmPwd"
                        backgroundColor={"white"}
                        borderRadius={"4px"}
                        fontSize={"0.9em"}
                        fontWeight={"400"}
                        mb={"10px"}
                        placeholder="Confirme a Senha"
                        type="password"
                      />
                      <FormErrorMessage>
                        {form.errors.confirmPwd}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  w="full"
                  mt={4}
                  fontFamily={"'Roboto', sans-serif"}
                  bg="#5cb646"
                  isLoading={props.isSubmitting}
                  type={"submit"}
                >
                  Criar
                </Button>
              </Form>
            )}
          </Formik>
        </Flex>
      </Flex>
    </>
  );
};

export default PaginaDeCadastro;
