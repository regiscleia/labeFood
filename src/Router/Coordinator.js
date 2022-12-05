export const irParaHome = (navigate) => {
  navigate("/feed");
};

export const irParaLogin = (navigate) => {
  navigate("/login");
};

export const irParaCadastro = (navigate) => {
  navigate("/cadastro");
};

export const irParaDetalhesRestaurante = (navigate, id) => {
  navigate(`/restaurante/${id}`);
};

export const irParaBusca = (navigate) => {
  navigate("/busca");
};

export const irParaEditarCadastro = (navigate) => {
  navigate("/editarcadastro");
};

export const irParaEditarEndereco = (navigate) => {
  navigate("/editarendereco");
};

export const irParaEditarPerfil = (navigate) => {
  navigate("/editarperfil");
};
export const irPedido = (navigate) => {
  navigate("/pedido")
}

export const voltar =(navigate)=>{
  navigate(-1)
}


export const irPerfil = (navigate) => {
  navigate("/perfil");
};

