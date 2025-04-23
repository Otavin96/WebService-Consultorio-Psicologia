import { FaUserEdit } from "react-icons/fa";
import * as L from "./styled";
import { IoCalendar } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";

const ListClient = () => {
  const map: number[] = [5, 5, 5, 5, 5];

  return (
    <L.Container>
      <L.Title>Gestão de Clientes</L.Title>
      <Link to="/inserir/cliente">
        <L.BtnInsertClient>Inserir cliente</L.BtnInsertClient>
      </Link>
      <L.Table>
        <L.Thead>
          <L.Tr>
            <L.Th>#</L.Th>
            <L.Th>Nome</L.Th>
            <L.Th>Telefone</L.Th>
            <L.Th>Whatsapp</L.Th>
            <L.Th>Data de Nascimento</L.Th>
            <L.Th>Ações</L.Th>
          </L.Tr>
        </L.Thead>
        <L.Tbody>
          {map.map((item, index) => (
            <L.Tr key={index}>
              <L.Td>{index + 1}</L.Td>
              <L.Td>John Due</L.Td>
              <L.Td>(99) 99999-9999</L.Td>
              <L.Td>
                <Link to="https://api.whatsapp.com/send/?phone=988010148">
                  99999-9999
                </Link>
              </L.Td>
              <L.Td>00/00/0000</L.Td>
              <L.Td>
                <L.Span>
                  <L.LinkIcon to="/editar/cliente">
                    <FaUserEdit />
                  </L.LinkIcon>
                  <L.LinkIcon to="#">
                    <RiDeleteBinFill />
                  </L.LinkIcon>
                  <L.LinkIcon to="#">
                    <IoCalendar />
                  </L.LinkIcon>
                </L.Span>
              </L.Td>
            </L.Tr>
          ))}
        </L.Tbody>
      </L.Table>
      <Pagination />
    </L.Container>
  );
};

export default ListClient;
