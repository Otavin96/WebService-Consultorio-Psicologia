import { FaMapMarkerAlt } from "react-icons/fa";

import * as I from "./styled";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";
import { Button } from "../../../components/Form/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getClientById } from "../../../services/clientService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSchedulingById } from "../../../services/schedulingService";
import { ConsultationDto } from "../../../tdos/consultation.dto";
import { insertConsultation } from "../../../services/consultationService";
import { usePostConsultationForm } from "../schemas/postConsultationSchema";
import { useAuth } from "../../../hooks/Auth/useAuth";
import { toast } from "react-toastify";
import { SchedulingDto } from "../../../tdos/scheduling.dto";

const InsertConsultation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schedulingId, clientId } = location.state;
  const { user } = useAuth();

  const newDate = new Date();
  const dateActual = newDate.toLocaleDateString("pt-BR");

  const [situation, useSituation] = useState("Completed");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = usePostConsultationForm();

  const { data: client, refetch } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
  });

  const { data: scheduling } = useQuery<SchedulingDto>({
    queryKey: ["scheduling", schedulingId],
    queryFn: () => getSchedulingById(schedulingId),
  });

  const mutation = useMutation({
    mutationFn: async (consultation: ConsultationDto) => {
      await insertConsultation({
        situation,
        previousConsultations: {
          date: dateActual,
          note: consultation.currentQuery,
        },
        currentQuery: consultation.currentQuery,
        patientAttention: consultation.patientAttention,
        scheduling: consultation.scheduling,
        professional: consultation.professional,
      });
    },
    onSuccess: () => {
      toast.success("Consulta realizada com sucesso!");
      refetch();
      navigate(`/listar/agendamento/${client?.id}`);
    },

    onError: () => {
      refetch();
      toast.error("Consulta não concluida!");
    },
  });

  const onSubmit = (consultation: any) => {
    mutation.mutate(consultation);
    reset();
  };

  const onError = (errors: unknown) => {
    console.log("Erros de validação:", errors);
  };

  useEffect(() => {
    if (client) {
      setValue("client.id", client.id);
      setValue("client.cpf", client.cpf);
      setValue("client.name", client.name);
      setValue("client.surname", client.surname);
      setValue("client.dateOfBirth", client.dateOfBirth);
      setValue("client.contact.phone", client.contact.phone);
      setValue("client.contact.whatsApp", client.contact.whatsApp);
      setValue("client.contact.email", client.contact.email);
      setValue("client.address.cep", client.address.cep);
      setValue("client.address.publicPlace", client.address.publicPlace);
      setValue("client.address.numberHouse", client.address.numberHouse);
      setValue("client.address.neighborhood", client.address.neighborhood);
      setValue("client.address.state", client.address.state);
      setValue("client.address.city", client.address.city);
    }
  }, [client, setValue]);

  return (
    <I.Container>
      <I.Box>
        <I.Title>Consulta</I.Title>
        <I.DetailsSchedule>
          <p>
            Data da Consulta:{" "}
            <strong>
              {scheduling?.date
                ? new Date(scheduling.date).toLocaleDateString("pt-BR")
                : "Data indisponível"}
            </strong>
          </p>

          <p>
            Data do Agendamento:{" "}
            <strong>
              {scheduling?.created_at
                ? new Date(scheduling.created_at).toLocaleDateString("pt-BR")
                : "Data indisponível"}
            </strong>
          </p>
          <p>
            Horário da Consulta: <strong>{scheduling?.time}</strong>
          </p>
          <p>
            Situação: <strong>Em andamento</strong>
          </p>
        </I.DetailsSchedule>
      </I.Box>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input {...register("scheduling")} type="hidden" value={schedulingId} />
        <Input {...register("professional")} type="hidden" value={user?.id} />
        <I.LeftSide>
          <I.DataClient>
            <Input
              {...register("client.cpf")}
              type="text"
              label="CPF*"
              disabled
            />
            <Input
              {...register("client.name")}
              type="text"
              label="Nome*"
              disabled
            />
            <Input
              {...register("client.surname")}
              type="text"
              label="Sobrenome*"
              disabled
            />
            <Input
              {...register("client.dateOfBirth")}
              type="date"
              label="Data de nascimento*"
              disabled
            />
          </I.DataClient>

          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input
                {...register("client.address.cep")}
                type="text"
                label="CEP*"
                disabled
              />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso
                {...register("client.address.publicPlace")}
                type="text"
                label="Logradouro*"
                disabled
              />
              <I.InputNumber
                {...register("client.address.numberHouse")}
                type="text"
                label="Número*"
                disabled
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                {...register("client.address.neighborhood")}
                type="text"
                label="Bairro*"
                disabled
              />
              <Select
                label="Estado*"
                {...register("client.address.state")}
                helperText={errors.client?.address?.state?.message}
                disabled
              >
                <option value="">Estado</option>
                <option value={client?.address.state} selected>
                  {client?.address.state}
                </option>
              </Select>

              <Select
                label="Cidade*"
                {...register("client.address.city")}
                helperText={errors.client?.address?.city?.message}
                disabled
              >
                <option value="">Cidade</option>
                <option value={client?.address.city} selected>
                  {client?.address.city}
                </option>
              </Select>
            </I.FormControl>
          </I.AddressClient>

          <I.Anotations>
            <I.Text>Anotações das consultas anteriores</I.Text>
            <textarea disabled />
          </I.Anotations>

          <I.Anotations>
            <I.Text>Anotações da consulta atual</I.Text>
            <textarea {...register("currentQuery")} />
          </I.Anotations>
        </I.LeftSide>

        <I.RightSide>
          <I.Contact>
            <I.SubTitle>Contato</I.SubTitle>
            <Input
              {...register("client.contact.phone")}
              type="text"
              label="Telefone / Celular*"
              disabled
            />
            <Input
              {...register("client.contact.whatsApp")}
              type="text"
              label="WhatsApp"
              disabled
            />
            <Input
              {...register("client.contact.email")}
              type="email"
              label="E-mail*"
              disabled
            />
          </I.Contact>

          <I.PointsAtention>
            <I.SubTitle>Pontos de atenção</I.SubTitle>
            <textarea {...register("patientAttention")} />
          </I.PointsAtention>
        </I.RightSide>

        <I.BtnGroup>
          <Button text="Salvar"></Button>
          <Button text="Concluir"></Button>
        </I.BtnGroup>
      </I.Form>
    </I.Container>
  );
};

export default InsertConsultation;
