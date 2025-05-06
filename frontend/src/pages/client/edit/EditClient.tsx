import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";
import { useLocation } from "react-router-dom";
import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editClient, getClientById } from "../../../services/clientService";
import { useEditClientForm } from "../schemas/editClientSchema";
import { ClientDto } from "../../../tdos/client.dto";
import { useEffect, useState } from "react";

const EditClient = () => {
  const location = useLocation();
  const id = location.state;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
  } = useEditClientForm();

  const [sameAddress, setSameAddress] = useState(false);

  const { isPending, data: clientEdit } = useQuery({
    queryKey: ["client"],
    queryFn: () => getClientById(id),
    refetchInterval: 10,
  });

  useEffect(() => {
    if (clientEdit) {
      setValue("name", clientEdit?.name);
      setValue("surname", clientEdit?.surname);
      setValue("dateOfBirth", clientEdit?.dateOfBirth);

      setValue("address.cep", clientEdit?.address.cep);
      setValue("address.publicPlace", clientEdit?.address.publicPlace);
      setValue("address.numberHouse", clientEdit?.address.numberHouse);
      setValue("address.neighborhood", clientEdit?.address.neighborhood);
      setValue("address.state", clientEdit?.address.state);
      setValue("address.city", clientEdit?.address.city);

      setValue("billingAddress.cep", clientEdit?.billingAddress?.cep);
      setValue(
        "billingAddress.publicPlace",
        clientEdit?.billingAddress?.publicPlace
      );
      setValue(
        "billingAddress.numberHouse",
        clientEdit?.billingAddress?.numberHouse
      );
      setValue(
        "billingAddress.neighborhood",
        clientEdit?.billingAddress?.neighborhood
      );
      setValue("billingAddress.state", clientEdit?.billingAddress?.state);
      setValue("billingAddress.city", clientEdit?.billingAddress?.city);

      setValue("contact.phone", clientEdit?.contact.phone);
      setValue("contact.whatsApp", clientEdit?.contact.whatsApp);
      setValue("contact.email", clientEdit?.contact.email);
    }
  }, [clientEdit, setValue]);

  const mutation = useMutation({
    mutationFn: async (client: ClientDto) => {
      console.log(client.address);

      await editClient(id, client);
    },

    onSuccess: (client) => {
      console.log("Cliente editado com sucesso", client);
      reset(); // Limpa o formulário após sucesso
    },
    onError: (error) => {
      console.log("Erro ao editar cliente", error);
    },
  });

  const onSubmit = (client: any): void => {
    console.log("Componente onSubmit chamado");
    console.log("Dados do formulário: ", client);
    try {
      mutation.mutate(client);
      reset();
    } catch (error) {
      console.log("Erro ao cadastrar cliente", error);
    }
  };

  const handleCopyAddress = () => {
    setSameAddress(!sameAddress);
    if (!sameAddress) {
      const currentAddress = getValues("address");
      setValue("billingAddress", currentAddress);
    }
  };

  const onError = (errors: any) => {
    console.log("Erros de validação:", errors);
  };

  if (isPending) return <h1>Loading...</h1>;

  return (
    <I.Container>
      <I.Title>Alterar Cliente</I.Title>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <I.LeftSide>
          <I.DataClient>
            <Input type="text" label="CPF*" value={clientEdit?.cpf} disabled />
            <Input {...register("name")} type="text" label="Nome*" />
            <Input {...register("surname")} type="text" label="Sobrenome*" />
            <Input
              {...register("dateOfBirth")}
              type="date"
              label="Data de nascimento*"
            />
          </I.DataClient>

          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input
                {...register("address.cep")}
                type="text"
                label="CEP*"
                helperText={errors.address?.cep?.message}
              />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso
                {...register("address.publicPlace")}
                type="text"
                label="Logradouro*"
                helperText={errors.address?.publicPlace?.message}
              />
              <I.InputNumber
                {...register("address.numberHouse")}
                type="text"
                label="Número* Caso não exista informar 'SN'"
                helperText={errors.address?.numberHouse?.message}
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                type="text"
                {...register("address.neighborhood")}
                label="Bairro*"
                helperText={errors.address?.neighborhood?.message}
              />
              <Select label="Estado*">
                <option>Estado</option>
                <option
                  {...register("address.state")}
                  defaultValue={clientEdit?.address.state}
                  selected
                >
                  {clientEdit?.address.state}
                </option>
                helperText={errors.address?.state?.message}
              </Select>
              <Select label="Cidade*">
                <option>Cidade</option>
                <option
                  {...register("address.city")}
                  defaultValue={clientEdit?.address.city}
                  selected
                >
                  {clientEdit?.address.city}
                </option>
                helperText={errors.address?.city?.message}
              </Select>
            </I.FormControl>
          </I.AddressClient>

          <I.AddressClient>
            <I.Header>
              <I.SubTitle>Endereço de Cobrança</I.SubTitle>
              <I.CheckboxContainer>
                <input
                  type="checkbox"
                  onChange={handleCopyAddress}
                  checked={sameAddress}
                />
                <label htmlFor="Utilizar o mesmo endereço de residência">
                  Utilizar o mesmo endereço de residência
                </label>
              </I.CheckboxContainer>
            </I.Header>

            <I.FormControlCep>
              <Input
                {...register("billingAddress.cep")}
                type="text"
                label="CEP*"
                helperText={errors.billingAddress?.cep?.message}
              />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso
                {...register("billingAddress.publicPlace")}
                type="text"
                label="Logradouro*"
                helperText={errors.billingAddress?.publicPlace?.message}
              />
              <I.InputNumber
                {...register("billingAddress.numberHouse")}
                type="text"
                label="Número* Caso não exista informar 'SN'"
                helperText={errors.billingAddress?.numberHouse?.message}
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                type="text"
                {...register("billingAddress.neighborhood")}
                label="Bairro*"
                helperText={errors.billingAddress?.neighborhood?.message}
              />
              <Select label="Estado*">
                <option>Estado</option>
                <option selected {...register("billingAddress.state")}>
                  {clientEdit?.billingAddress?.state}
                </option>
                helperText={errors.billingAddress?.state?.message}
              </Select>
              <Select label="Cidade*">
                <option>Cidade</option>
                <option selected {...register("billingAddress.city")}>
                  {clientEdit?.billingAddress?.city}
                </option>
                helperText={errors.billingAddress?.city?.message}
              </Select>
            </I.FormControl>
          </I.AddressClient>
        </I.LeftSide>

        <I.RightSide>
          <I.SubTitle>Contato</I.SubTitle>
          <I.Contact>
            <Input
              {...register("contact.phone")}
              type="text"
              label="Telefone / Celular*"
              helperText={errors.contact?.phone?.message}
            />
            <Input
              type="text"
              {...register("contact.whatsApp")}
              label="WhatsApp"
              helperText={errors.contact?.whatsApp?.message}
            />
            <Input
              type="email"
              {...register("contact.email")}
              label="E-mail*"
              helperText={errors.contact?.email?.message}
            />
          </I.Contact>
        </I.RightSide>

        <I.BtnGroup>
          <Button text="Salvar"></Button>
        </I.BtnGroup>
      </I.Form>
    </I.Container>
  );
};

export default EditClient;
