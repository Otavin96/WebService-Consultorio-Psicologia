import { FaUserEdit } from "react-icons/fa";
import * as L from "./styled";
import { IoCalendar } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";

import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "../../../services/clientService";

const ListClient = () => {
  const [queryParams] = useSearchParams();

  const per_page = queryParams.get("per_page")
    ? Number(queryParams.get("per_page"))
    : 5;

  const page = queryParams.get("page") ? Number(queryParams.get("page")) : 1;

  const { data: clientsResponse, isPending } = useQuery({
    queryKey: ["clients", per_page, page],
    queryFn: () => fetchClients(per_page, page),
  });

  if (isPending) return <h1>Loading</h1>;

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
          {clientsResponse?.items?.length === 0 && (
            <L.TdNull colSpan={6}>Lista de clientes vazia</L.TdNull>
          )}
          {clientsResponse?.items?.map((client, index) => (
            <L.Tr key={client.id}>
              <L.Td>{index + 1}</L.Td>
              <L.Td>{client.name}</L.Td>
              <L.Td>{client.contact.phone}</L.Td>
              <L.Td>
                <Link
                  to={`https://api.whatsapp.com/send/?phone=${client.contact.whatsApp}`}
                >
                  {client.contact.whatsApp}
                </Link>
              </L.Td>
              <L.Td>{client.dateOfBirth}</L.Td>
              <L.Td>
                <L.Span>
                  <L.LinkIcon to={"/editar/cliente"} state={client.id}>
                    <FaUserEdit />
                  </L.LinkIcon>
                  <L.LinkIcon to="#">
                    <RiDeleteBinFill />
                  </L.LinkIcon>
                  <L.LinkIcon
                    to={`/listar/agendamento/${client.id}?name=${encodeURIComponent(client.name)}`}
                  >
                    <IoCalendar />
                  </L.LinkIcon>
                </L.Span>
              </L.Td>
            </L.Tr>
          ))}
        </L.Tbody>
      </L.Table>
      <Pagination
        current_page={page}
        last_page={Number(clientsResponse?.last_page)}
        per_page={per_page}
        total={Number(clientsResponse?.total)}
      />
    </L.Container>
  );
};

export default ListClient;
