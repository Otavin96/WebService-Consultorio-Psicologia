import { Link } from "react-router-dom";
import * as S from "./styled";

const Unauthorized = () => {
  return (
    <S.Container>
      <S.Card>
        <S.Title>403 - Acesso Negado</S.Title>
        <p>Você não tem permissão para acessar esta página.</p>
        <Link to={"/"}>Voltar</Link>
      </S.Card>
    </S.Container>
  );
};

export default Unauthorized;
