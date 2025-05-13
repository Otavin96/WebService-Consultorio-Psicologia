import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useEditClientForm } from "../schemas/editClientSchema";
import { getClientById, editClient } from "../../../services/clientService";
import { fetchApiBrasil } from "../../../helpers/brasilAPI";
import { fetchCitiesByState } from "../../../helpers/fetchCitiesByState";
import { states } from "../../../util/State";

import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";
import { Button } from "../../../components/Form/Button/Button";
import * as I from "./styled";

const EditClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    control,
    reset,
  } = useEditClientForm();

  const location = useLocation();
  const id = location.state;

  const [sameAddress, setSameAddress] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [billingCities, setBillingCities] = useState<string[]>([]);

  const selectedState = watch("address.state");
  const selectedBillingState = watch("billingAddress.state");

  const searchDataZipCode = async (cep: string, typeAddress: string) => {
    try {
      const data = await fetchApiBrasil(cep);
      if (!data) return toast.error("CEP não encontrado.");

      const base = typeAddress === "address" ? "address" : "billingAddress";

      setValue(`${base}.publicPlace`, data.street || "");
      setValue(`${base}.neighborhood`, data.neighborhood || "");
      setValue(`${base}.state`, data.state || "");
      setValue(`${base}.city`, data.city || "");
    } catch {
      toast.error("Erro ao buscar CEP.");
    }
  };

  const { isPending, data: clientEdit } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id),
  });

  useEffect(() => {
    if (clientEdit) {
      setValue("name", clientEdit.name);
      setValue("surname", clientEdit.surname);
      setValue("dateOfBirth", clientEdit.dateOfBirth);
      setValue("address", clientEdit.address);
      setValue("billingAddress", clientEdit.billingAddress || {});
      setValue("contact", clientEdit.contact);
    }
  }, [clientEdit, setValue]);

  useEffect(() => {
    if (selectedState) {
      fetchCitiesByState(selectedState).then(setCities);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedBillingState) {
      fetchCitiesByState(selectedBillingState).then(setBillingCities);
    }
  }, [selectedBillingState]);

  useEffect(() => {
    if (sameAddress) {
      const addr = getValues("address");
      setValue("billingAddress", addr);
    }
  }, [sameAddress]);

  const mutation = useMutation({
    mutationFn: async (data) => await editClient(id, data),
    onSuccess: () => {
      toast.success("Cliente editado com sucesso");
    },
    onError: () => toast.error("Erro ao editar cliente."),
  });

  const onSubmit = (data: any) => mutation.mutate(data);
  const onError = (err: any) => console.log("Erros de validação:", err);

  if (isPending) return <h1>Carregando...</h1>;

  return (
    <I.Container>
      <I.Title>Alterar Cliente</I.Title>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <I.LeftSide>
          {/* Dados Pessoais */}
          <I.DataClient>
            <Input type="text" label="CPF*" value={clientEdit?.cpf} disabled />
            <Input
              {...register("name")}
              type="text"
              label="Nome*"
              helperText={errors.name?.message}
            />
            <Input
              {...register("surname")}
              type="text"
              label="Sobrenome*"
              helperText={errors.surname?.message}
            />
            <Input
              {...register("dateOfBirth")}
              type="date"
              label="Data de nascimento*"
              helperText={errors.dateOfBirth?.message}
            />
          </I.DataClient>

          {/* Endereço */}
          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input
                {...register("address.cep")}
                type="text"
                label="CEP*"
                helperText={errors.address?.cep?.message}
              />
              <I.BtnSearchCep type="button">
                <FaMapMarkerAlt
                  onClick={() =>
                    searchDataZipCode(getValues("address.cep"), "address")
                  }
                />
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
                label="Número* (ou 'SN')"
                helperText={errors.address?.numberHouse?.message}
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                {...register("address.neighborhood")}
                type="text"
                label="Bairro*"
                helperText={errors.address?.neighborhood?.message}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <Select label="Estado*" {...field}>
                    <option value="">Estado</option>
                    {states.map((s) => (
                      <option key={s.acronym} value={s.acronym}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="address.city"
                control={control}
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

          {/* Endereço de Cobrança */}
          <I.AddressClient>
            <I.Header>
              <I.SubTitle>Endereço de Cobrança</I.SubTitle>
              <I.CheckboxContainer>
                <input
                  type="checkbox"
                  onChange={() => setSameAddress(!sameAddress)}
                  checked={sameAddress}
                />
                <label>Utilizar o mesmo endereço de residência</label>
              </I.CheckboxContainer>
            </I.Header>

            <I.FormControlCep>
              <Input
                {...register("billingAddress.cep")}
                type="text"
                label="CEP*"
                helperText={errors.billingAddress?.cep?.message}
              />
              <I.BtnSearchCep type="button">
                <FaMapMarkerAlt
                  onClick={() =>
                    searchDataZipCode(
                      getValues("billingAddress.cep"),
                      "billingAddress"
                    )
                  }
                />
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
                label="Número* (ou 'SN')"
                helperText={errors.billingAddress?.numberHouse?.message}
              />
            </I.FormControl>

            <I.FormControl>
              <Input
                {...register("billingAddress.neighborhood")}
                type="text"
                label="Bairro*"
                helperText={errors.billingAddress?.neighborhood?.message}
              />
              <Controller
                name="billingAddress.state"
                control={control}
                render={({ field }) => (
                  <Select label="Estado*" {...field}>
                    <option value="">Estado</option>
                    {states.map((s) => (
                      <option key={s.acronym} value={s.acronym}>
                        {s.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="billingAddress.city"
                control={control}
                render={({ field }) => (
                  <Select label="Cidade*" {...field}>
                    <option value="">Cidade</option>
                    {billingCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                )}
              />
            </I.FormControl>
          </I.AddressClient>
        </I.LeftSide>

        {/* Contato */}
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
              {...register("contact.whatsApp")}
              type="text"
              label="WhatsApp"
              helperText={errors.contact?.whatsApp?.message}
            />
            <Input
              {...register("contact.email")}
              type="email"
              label="E-mail*"
              helperText={errors.contact?.email?.message}
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

export default EditClient;
