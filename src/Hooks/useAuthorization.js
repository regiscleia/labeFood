import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import para a cordenada quando token cair em null ou undefined

const useAuthorization = () => {
  const navigate = useNavigate();
  const {token} = localStorage

  useEffect(() => {
    if (token === null || token === undefined) {
      //cordinator para pagina de login(navigate);
    }
  }, []);

  return token;
};

export default useAuthorization; 