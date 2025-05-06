import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";

import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editClient, getClientById } from "../../../services/clientService";
import { usePostSchedulingForm } from "../schemas/postSchedulingSchema";
import { useEffect } from "react";
import { SchedulingDto } from "../../../tdos/scheduling.dto";
import { insertScheduling } from "../../../services/schedulingService";
const InsertScheduling = () => {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = usePostSchedulingForm();

  const { isPending, data: client } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClientById(id),
  });

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

  const mutation = useMutation({
    mutationFn: async (scheduling: SchedulingDto) => {
      await editClient(scheduling.client.id, {
        address: scheduling.client.address,
        contact: scheduling.client.contact,
      });

      await insertScheduling(scheduling);
    },
    onSuccess: () => reset(),
  });

  const onSubmit = (data: SchedulingDto) => {
    console.log("Componente onSubmit chamado");
    try {
      mutation.mutate(data);

      navigate("/listar/agendamento", {
        state: { id: client?.id, name: client?.name },
      });
    } catch (error) {
      console.log("Erro ao cadastrar Scheduling", error);
    }
  };

  const onError = (errors: unknown) => {
    console.log("Erros de validação:", errors);
  };

  if (isPending || !client) return <h1>Loading...</h1>;

  return (
    <I.Container>
      <I.Title>Inserir agendamento</I.Title>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input {...register("client.id")} type="hidden" />
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
                helperText={errors.client?.address?.cep?.message}
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
                helperText={errors.client?.address?.publicPlace?.message}
              />
              <I.InputNumber
                {...register("client.address.numberHouse")}
                type="text"
                label="Número*"
                helperText={errors.client?.address?.numberHouse?.message}
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                {...register("client.address.neighborhood")}
                type="text"
                label="Bairro*"
                helperText={errors.client?.address?.neighborhood?.message}
              />

              <Select
                label="Estado*"
                {...register("client.address.state")}
                helperText={errors.client?.address?.state?.message}
              >
                <option value="">Estado</option>
                <option value={client.address.state} selected>
                  {client.address.state}
                </option>
              </Select>

              <Select
                label="Cidade*"
                {...register("client.address.city")}
                helperText={errors.client?.address?.city?.message}
              >
                <option value="">Cidade</option>
                <option value={client.address.city} selected>
                  {client.address.city}
                </option>
              </Select>
            </I.FormControl>
          </I.AddressClient>

          <I.DataScheduling>
            <I.SubTitle>Dados do agendamento</I.SubTitle>

            <I.FormDate>
              <Input
                {...register("date")}
                type="date"
                label="Data*"
                helperText={errors.date?.message}
              />

              <Select
                label="Horário*"
                {...register("time")}
                helperText={errors.time?.message}
              >
                <option value="">Selecione um horário</option>
                <option {...register("time")} value="18:00:00">
                  18:00
                </option>
                <option {...register("time")} value="19:00:00">
                  19:00
                </option>
              </Select>
            </I.FormDate>

            <I.FormControlObservacao>
              <label htmlFor="Observação">Observação*</label>
              <textarea {...register("observations")} />
              {errors.observations && (
                <span>{errors.observations.message}</span>
              )}
            </I.FormControlObservacao>
          </I.DataScheduling>
        </I.LeftSide>

        <I.RightSide>
          <I.SubTitle>Contato</I.SubTitle>
          <I.Contact>
            <Input
              {...register("client.contact.phone")}
              type="text"
              label="Telefone / Celular*"
              helperText={errors.client?.contact?.phone?.message}
            />
            <Input
              {...register("client.contact.whatsApp")}
              type="text"
              label="WhatsApp"
              helperText={errors.client?.contact?.whatsApp?.message}
            />
            <Input
              {...register("client.contact.email")}
              type="email"
              label="E-mail*"
              helperText={errors.client?.contact?.email?.message}
            />
          </I.Contact>
        </I.RightSide>

        <I.BtnGroup>
          <Button text="Salvar" />
        </I.BtnGroup>
      </I.Form>
    </I.Container>
  );
};

export default InsertScheduling;
