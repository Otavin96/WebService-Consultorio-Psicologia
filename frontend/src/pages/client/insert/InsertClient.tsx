import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";
import { useMutation } from "@tanstack/react-query";
import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";
import { ClientDto } from "../../../tdos/client.dto";
import { insertClient } from "../../../services/clientService";
import { useEffect, useState } from "react";
import { usePostClientForm } from "../schemas/postClientSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchCitiesByState } from "../../../helpers/fetchCitiesByState";
import { fetchApiBrasil } from "../../../helpers/brasilAPI";
import { Controller } from "react-hook-form";
import { states } from "../../../util/State";

const InsertClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    control,
    reset,
  } = usePostClientForm();

  const nav = useNavigate();
  const [sameAddress, setSameAddress] = useState(false);

  const [cities, setCities] = useState<string[]>([]);
  const [billingCities, setBillingCities] = useState<string[]>([]);

  const selectedState = watch("address.state");
  const selectedBillingState = watch("billingAddress.state");

  const searchDataZipCode = async (cep: string, typeAddress: string) => {
    try {
      const data = await fetchApiBrasil(cep);

      if (data) {
        if (typeAddress === "address") {
          // Atualiza os campos do formulário com os dados retornados
          setValue("address.publicPlace", data.street || ""); // Verifique se a "street" está vazia
          setValue("address.neighborhood", data.neighborhood || ""); // Verifique se o "neighborhood" está vazio
          setValue("address.state", data.state || ""); // Estado
          setValue("address.city", data.city || ""); // Cidade
        }

        if (typeAddress === "billingAddress") {
          // Atualiza os campos do formulário com os dados retornados
          setValue("billingAddress.publicPlace", data.street || ""); // Verifique se a "street" está vazia
          setValue("billingAddress.neighborhood", data.neighborhood || ""); // Verifique se o "neighborhood" está vazio
          setValue("billingAddress.state", data.state || ""); // Estado
          setValue("billingAddress.city", data.city || ""); // Cidade
        }
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

  useEffect(() => {
    if (selectedBillingState) {
      fetchCitiesByState(selectedBillingState).then(setBillingCities);
    }
  }, [selectedBillingState]);

  const mutation = useMutation({
    mutationFn: async (client: ClientDto) => {
      return insertClient(client);
    },
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      nav("/gestao/clientes");
    },
    onError: () => {
      toast.error("Erro ao cadastrar cliente");
      reset();
    },
  });

  const onSubmit = (data: ClientDto) => {
    mutation.mutate(data);
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

  return (
    <I.Container>
      <I.Title>Inserir Cliente</I.Title>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <I.LeftSide>
          {/* Dados do Cliente */}
          <I.DataClient>
            <Input
              {...register("cpf")}
              type="text"
              label="CPF*"
              helperText={errors.cpf?.message}
            />
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

          {/* Endereço Residencial */}
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
                label="Número* Caso não exista informar 'SN'"
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
                name="address.state" // O nome do campo no seu formulário
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
                name="address.city"
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

          {/* Endereço de Cobrança */}
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
                label="Número* Caso não exista informar 'SN'"
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
                name="billingAddress.state" // O nome do campo no seu formulário
                control={control} // Controlador do React Hook Form
                defaultValue="" // Valor inicial (pode ser o valor retornado pela API)
                render={({ field }) => (
                  <Select label="Estado*" {...field}>
                    <option value="">Estado</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    {/* Adicione mais estados conforme necessário */}
                  </Select>
                )}
              />
              <Controller
                name="billingAddress.city"
                control={control}
                defaultValue=""
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

        {/* Dados de Contato */}
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
          <Button text="Salvar" type="submit" />
        </I.BtnGroup>
      </I.Form>
    </I.Container>
  );
};

export default InsertClient;
