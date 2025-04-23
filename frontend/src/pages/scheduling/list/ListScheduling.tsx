import { IoCalendar, IoCreateSharp } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import * as L from "./styled";
import Pagination from "../../../components/pagination/Pagination";
import { MdAccessTimeFilled } from "react-icons/md";

function ListScheduling() {
    const map: number[] = [5, 5, 5, 5, 5];

    return (
      <L.Container>
        <L.Title>Agendamentos - "Name"</L.Title>
        <Link to="/inserir/cliente">
          <L.BtnInsertAgendamento>Inserir Agendamento</L.BtnInsertAgendamento>
        </Link>
        <L.Table>
          <L.Thead>
            <L.Tr>
              <L.Th>#</L.Th>
              <L.Th>Data</L.Th>
              <L.Th>Whatsapp</L.Th>
              <L.Th>Ações</L.Th>
            </L.Tr>
          </L.Thead>
          <L.Tbody>
            {map.map((item, index) => (
              <L.Tr key={index}>
                <L.Td>{index + 1}</L.Td>
                <L.Td>22/04/2025 15:30</L.Td>
                <L.Td>
                  <Link to="https://api.whatsapp.com/send/?phone=988010148">
                    99999-9999
                  </Link>
                </L.Td>
                <L.Td>
                  <L.Span>
                    <L.LinkIcon to="/editar/cliente">
                    <IoCreateSharp />
                    </L.LinkIcon>
                    <L.LinkIcon to="#">
                      <RiDeleteBinFill />
                    </L.LinkIcon>
                    <L.LinkIcon to="#">
                    <MdAccessTimeFilled />
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
}

export default ListScheduling