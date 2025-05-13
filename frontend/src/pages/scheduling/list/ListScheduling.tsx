import { useState } from "react";
import { IoCreateSharp } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdAccessTimeFilled } from "react-icons/md";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import * as L from "./styled";
import Modal from "../../../components/Modal/Modal";
import Pagination from "../../../components/pagination/Pagination";

import {
  deleteScheduling,
  fetchAllSchedulingByClient,
} from "../../../services/schedulingService";
import { SchedulingDto } from "../../../tdos/scheduling.dto";
import { toast } from "react-toastify";

function ListScheduling() {
  const { id } = useParams();
  const [queryParams] = useSearchParams();

  const [dateScheduling, setDateScheduling] = useState<Date>();
  const [idScheduling, setIdScheduling] = useState<string>();
  const [modal, setModal] = useState(false);

  // setName();

  const per_page = queryParams.get("per_page")
    ? Number(queryParams.get("per_page"))
    : 5;

  const page = queryParams.get("page") ? Number(queryParams.get("page")) : 1;

  const {
    data: schedulingResponse,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["schedulings", per_page, page],
    queryFn: () => fetchAllSchedulingByClient(id, per_page, page),
  });

  const mutation = useMutation({
    mutationKey: ["schedulings"],
    mutationFn: async (id: string | undefined) => {
      if (!id) return;
      await deleteScheduling(id);
    },
    onSuccess: () => {
      toast.success("Agendamento excluido com sucesso!");
      refetch();
    },
    onError: () => {
      toast.error("Houve um erro ao tentar excluir o agendamento!");
    },
  });

  const handleModal = (id: string | undefined, date: Date | undefined) => {
    setModal(true);
    setIdScheduling(id);
    setDateScheduling(date);
  };

  const onConfirm = (id: string | undefined) => {
    if (!id) return;
    mutation.mutate(id);
  };

  if (isPending) return <h1>Loading...</h1>;

  return (
    <L.Container>
      {modal && (
        <Modal
          title="Cancelamento de agendamento"
          message={`Deseja realmente cancelar o agendamento do dia ${
            dateScheduling
              ? new Date(dateScheduling).toLocaleString("pt-BR")
              : ""
          }?`}
          setModal={setModal}
          onConfirm={() => onConfirm(idScheduling)}
          id={idScheduling}
        />
      )}

      <L.Title>Agendamentos - {localStorage.getItem("client_name")}</L.Title>

      <Link to="/inserir/agendamento" state={id}>
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
          {schedulingResponse?.items.map((scheduling: SchedulingDto, index) => (
            <L.Tr key={scheduling.id}>
              <L.Td>{index + 1}</L.Td>
              <L.Td>{`${scheduling.date} ${scheduling.time}`}</L.Td>
              <L.Td>
                <Link
                  to={`https://api.whatsapp.com/send?phone=${scheduling.client.contact.whatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {scheduling.client.contact.whatsApp}
                </Link>
              </L.Td>
              <L.Td>
                <L.Span>
                  <L.LinkIcon to="/editar/cliente">
                    <IoCreateSharp />
                  </L.LinkIcon>

                  <L.LinkIcon
                    to={"#"}
                    onClick={() => handleModal(scheduling?.id, scheduling.date)}
                  >
                    <RiDeleteBinFill />
                  </L.LinkIcon>

                  <L.LinkIcon
                    to="/inserir/consulta"
                    state={{
                      schedulingId: scheduling.id,
                      clientId: scheduling.client.id,
                    }}
                  >
                    <MdAccessTimeFilled />
                  </L.LinkIcon>
                </L.Span>
              </L.Td>
            </L.Tr>
          ))}
        </L.Tbody>
      </L.Table>

      <Pagination
        current_page={page}
        per_page={per_page}
        last_page={Number(schedulingResponse?.last_page)}
        total={Number(schedulingResponse?.total)}
      />
    </L.Container>
  );
}

export default ListScheduling;
