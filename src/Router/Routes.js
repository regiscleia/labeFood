import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaBuscarRestaurante from "../Pages/PaginaBuscarRestaurante/PaginaBuscarRestaurante";
import PaginaHome from "../Pages/PaginaHome/PaginaHome";
import PaginaDeCadastro from "../Pages/PaginaDeCadastro/PaginaDeCadastro";
import PaginaEditarEndereco from "../Pages/PaginaEditarEndereco/PaginaEditarEndereco";
import PaginaEditarPerfil from "../Pages/PaginaEditarPerfil/PaginaEditarPerfil";
import PaginaLogin from "../Pages/PaginaDeLogin/PaginaDeLogin";
import PaginaPedido from "../Pages/PaginaPedido/PaginaPedido";
import PaginaDetalhesRestaurante from "../Pages/PaginaDetalhesRestaurante/PaginaDetalhesRestaurante";
import PaginaPerfil from "../Pages/PaginaPerfil/PaginaPerfil";
import PaginaInicial from "../Pages/PaginaInicial"


export const Router = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<PaginaInicial />} />
          <Route path="/feed" element={<PaginaHome />} />
          <Route path="/cadastro" element={<PaginaDeCadastro />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/busca" element={<PaginaBuscarRestaurante />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="/editarendereco" element={<PaginaEditarEndereco />} />
          <Route path="/editarperfil" element={<PaginaEditarPerfil />} />
          <Route path="/pedido" element={<PaginaPedido />} />
          <Route path="/restaurante/:id" element={<PaginaDetalhesRestaurante />} />
        </Routes>
      </BrowserRouter>
  )


}
