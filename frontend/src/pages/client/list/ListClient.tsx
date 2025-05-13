import { FaUserEdit } from "react-icons/fa";
import * as L from "./styled";
import { IoCalendar } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteClient, fetchClients } from "../../../services/clientService";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { DataProps } from "../../../tdos/data.dto";
import { toast } from "react-toastify";

const ListClient = () => {
  const [queryParams] = useSearchParams();
  const [modal, setModal] = useState(false);
  const [dataClient, setDataClient] = useState<DataProps>();

  const per_page = queryParams.get("per_page")
    ? Number(queryParams.get("per_page"))
    : 5;

  const page = queryParams.get("page") ? Number(queryParams.get("page")) : 1;

  const {
    data: clientsResponse,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["clients", per_page, page],
    queryFn: () => fetchClients(per_page, page),
  });

  const mutation = useMutation({
    mutationKey: ["clients"],
    mutationFn: async (id: string | undefined) => {
      await deleteClient(id);
    },
    onSuccess: () => {
      toast.success("Cliente removido com sucesso!");
      refetch();
    },
    onError: () => {
      toast.error("Ocorreu um erro ao tentar remover o cliente!");
    },
  });

  const handleModal = (id: string, name: string) => {
    const data: DataProps = { id, name };
    setModal(true);
    setDataClient(data);
  };

  const onConfirm = (id: string | undefined) => {
    mutation.mutate(id);
  };

  if (isPending) return <h1>Loading</h1>;

  return (
    <L.Container>
      {modal && (
        <Modal
          title="Exclusão de cliente"
          message={`Deseja realmente excluir o cliente ${dataClient?.name}`}
          setModal={setModal}
          onConfirm={() => onConfirm(dataClient?.id)}
          id={dataClient?.id}
        />
      )}
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
                  <L.LinkIcon
                    onClick={() => handleModal(client.id, client.name)}
                    to={"#"}
                  >
                    <RiDeleteBinFill />
                  </L.LinkIcon>
                  <L.LinkIcon
                    to={`/listar/agendamento/${client.id}`}
                    onClick={() =>
                      localStorage.setItem("client_name", client.name)
                    }
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
