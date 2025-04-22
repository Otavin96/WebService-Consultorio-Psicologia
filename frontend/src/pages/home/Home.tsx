import { Link } from "react-router-dom";
import * as S from "./styled";

function Home() {
  return (
    <S.Container>
      <S.ContentLeft>
        <S.Title>Página Inicial </S.Title>

        <Link to="/gestao/clientes">
          <S.AddUser>
            <p>Gestão de Clientes</p>
          </S.AddUser>
        </Link>
      </S.ContentLeft>
    </S.Container>
  );
}

export default Home;
