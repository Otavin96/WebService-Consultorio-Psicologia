import { useAuth } from "../../hooks/Auth/useAuth";
import * as N from "./styled";

const Navbar = () => {
  const { setAuth } = useAuth();
  const date = new Date();
  const { user } = useAuth();
  const dateActual = date.toLocaleDateString("pt-BR");
  const hourActual = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const Logout = () => {
    setAuth(false);
    sessionStorage.clear();
  };

  return (
    <N.Nav>
      <N.ContentRight>
        <N.Date>{dateActual}</N.Date>
        <N.Date>{hourActual}</N.Date>
        <p>{user?.name}</p>
        <N.Logout onClick={() => Logout()}>Sair</N.Logout>
      </N.ContentRight>
    </N.Nav>
  );
};

export default Navbar;
