import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";

import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editClient, getClientById } from "../../../services/clientService";
import { usePostSchedulingForm } from "../schemas/postSchedulingSchema";
import { useEffect, useState } from "react";
import { SchedulingDto } from "../../../tdos/scheduling.dto";
import { insertScheduling } from "../../../services/schedulingService";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { fetchCitiesByState } from "../../../helpers/fetchCitiesByState";
import { fetchApiBrasil } from "../../../helpers/brasilAPI";
import { states } from "../../../util/State";

const InsertScheduling = () => {
  const location = useLocation();
  const id = location.state;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    watch,
    control,
  } = usePostSchedulingForm();

  const [cities, setCities] = useState<string[]>([]);

  const {
    isPending,
    data: client,
    refetch,
  } = useQuery({
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

  const selectedState = watch("client.address.state");

  const searchDataZipCode = async (cep: string) => {
    try {
      const data = await fetchApiBrasil(cep);

      if (data) {
        // Atualiza os campos do formulário com os dados retornados
        setValue("client.address.publicPlace", data.street || ""); // Verifique se a "street" está vazia
        setValue("client.address.neighborhood", data.neighborhood || ""); // Verifique se o "neighborhood" está vazio
        setValue("client.address.state", data.state || ""); // Estado
        setValue("client.address.city", data.city || ""); // Cidade
      } else {
        toast.error("CEP não encontrado.");
        return;
      }
    } catch (err) {
      toast.error("Erro ao buscar CEP.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedState) {
      fetchCitiesByState(selectedState).then(setCities);
    }
  }, [selectedState]);

  const mutation = useMutation({
    mutationFn: async (scheduling: SchedulingDto) => {
      await editClient(scheduling.client.id, {
        address: scheduling.client.address,
        contact: scheduling.client.contact,
      });

      await insertScheduling(scheduling);
    },
    onSuccess: () => {
      toast.success("Agendamento realizado com sucesso");
      navigate(`/listar/agendamento/${client?.id}`);
      refetch();
    },
    onError: () => {
      toast.error("Hove um erro ao tentar realizar o agendamento");
    },
  });

  const onSubmit = (data: SchedulingDto) => {
    try {
      mutation.mutate(data);
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

          {/* Endereço Residencial */}
          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input
                {...register("client.address.cep")}
                type="text"
                label="CEP*"
                helperText={errors.client?.address?.cep?.message}
              />
              <I.BtnSearchCep type="button">
                <FaMapMarkerAlt
                  onClick={() =>
                    searchDataZipCode(getValues("client.address.cep"))
                  }
                />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso
                {...register("client.address.publicPlace")}
                type="text"
                label="Logradouro*"
                helperText={errors.client?.address?.publicPlace}
              />
              <I.InputNumber
                {...register("client.address.numberHouse")}
                type="text"
                label="Número* Caso não exista informar 'SN'"
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
              <Controller
                name="client.address.state" // O nome do campo no seu formulário
                control={control} // Controlador do React Hook Form
                defaultValue="" // Valor inicial (pode ser o valor retornado pela API)
                render={({ field }) => (
                  <Select label="Estado*" {...field}>
                    <option value="">Estado</option>
                    {states.map((state) => (
                      <option key={state.acronym} value={state.acronym}>
                        {state.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="client.address.city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select label="Cidade*" {...field}>
                    <option value="">Cidade</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                )}
              />
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
                <option {...register("time")} value="08:00:00">
                  8:00
                </option>
                <option {...register("time")} value="09:00:00">
                  9:00
                </option>
                <option {...register("time")} value="10:00:00">
                  10:00
                </option>
                <option {...register("time")} value="11:00:00">
                  11:00
                </option>
                <option {...register("time")} value="13:00:00">
                  13:00
                </option>
                <option {...register("time")} value="14:00:00">
                  14:00
                </option>
                <option {...register("time")} value="15:00:00">
                  15:00
                </option>
                <option {...register("time")} value="16:00:00">
                  16:00
                </option>
                <option {...register("time")} value="17:00:00">
                  17:00
                </option>
                <option {...register("time")} value="18:00:00">
                  18:00
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
