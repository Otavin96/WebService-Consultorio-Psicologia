import { IoCreateSharp } from "react-icons/io5";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import * as L from "./styled";
import Pagination from "../../../components/pagination/Pagination";
import { MdAccessTimeFilled } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchAllSchedulingByClient } from "../../../services/schedulingService";
import { SchedulingDto } from "../../../tdos/scheduling.dto";
import { useEffect } from "react";

function ListScheduling() {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const { id } = useParams();

  const query = new URLSearchParams(location.search);
  const name = query.get("name");

  const per_page = queryParams.get("per_page")
    ? Number(queryParams.get("per_page"))
    : 5;

  const page = queryParams.get("page") ? Number(queryParams.get("page")) : 1;

  useEffect(() => {
    if (!id || !name) {
      // Redireciona para outra rota se os dados não estiverem disponíveis
      navigate("/listar/agendamento");
    }
  }, [id, name, navigate]);

  const { data: schedulingResponse, isPending } = useQuery({
    queryKey: ["schedulings", per_page, page],
    queryFn: () => fetchAllSchedulingByClient(id, per_page, page),
  });

  if (isPending) return <h1>Loading</h1>;

  return (
    <L.Container>
      <L.Title>Agendamentos - {name}</L.Title>
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
            <L.Tr key={index}>
              <L.Td>{index + 1}</L.Td>
              <L.Td>{`${scheduling.date} ${scheduling.time}`}</L.Td>
              <L.Td>
                <Link to="https://api.whatsapp.com/send/?phone=988010148">
                  {scheduling.client.contact.whatsApp}
                </Link>
              </L.Td>
              <L.Td>
                <L.Span>
                  <L.LinkIcon to="/editar/cliente">
                    <IoCreateSharp />
                  </L.LinkIcon>
                  <L.LinkIcon to="">
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
