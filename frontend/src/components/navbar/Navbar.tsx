import * as N from "./styled";

const Navbar = () => {
  const date = new Date();

  const dateActual = date.toLocaleDateString("pt-BR");
  const hourActual = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return (
    <N.Nav>
      <N.ContentRight>
        <N.Date>{dateActual}</N.Date>
        <N.Date>{hourActual}</N.Date>
        <p>Olá usuário</p>
      </N.ContentRight>
    </N.Nav>
  );
};

export default Navbar;
