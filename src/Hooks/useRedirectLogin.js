import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import para a cordenada quando token for diferente de null ou undefined

const useRedirectLogin = () => {
  const navigate = useNavigate();
  const {token} = localStorage

  useEffect(() => {
    if (token !== null && token !== undefined) {
      //cordenada para a pagina de feed(navigate);
    }
  }, []);
};

export default useRedirectLogin; 