import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";
import { useMutation } from "@tanstack/react-query";
import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";
import { ClientDto } from "../../../tdos/client.dto";
import { insertClient } from "../../../services/clientService";
import { useState } from "react";
import { usePostClientForm } from "../schemas/postClientSchema";

const InsertClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset, // Reset form after submit
  } = usePostClientForm();

  const [sameAddress, setSameAddress] = useState(false);

  const mutation = useMutation({
    mutationFn: async (client: ClientDto) => {
      console.log("Enviando dados ao backend: ", client); // Diagnóstico
      return insertClient(client); // Certifique-se de que insertClient retorna uma promise
    },
    onSuccess: (data) => {
      console.log("Cliente cadastrado com sucesso", data);
      reset(); // Limpa o formulário após sucesso
    },
    onError: (error) => {
      console.log("Erro ao cadastrar cliente", error);
    },
  });

  const onSubmit = (data: ClientDto) => {
    console.log("Componente onSubmit chamado");
    console.log("Dados do formulário: ", data);
    try {
      mutation.mutate(data);
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

  return (
    <I.Container>
      <I.Title>Inserir Cliente</I.Title>
      <I.Form onSubmit={handleSubmit(onSubmit, onError)}>
        <I.LeftSide>
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
                {...register("address.neighborhood")}
                type="text"
                label="Bairro*"
                helperText={errors.address?.neighborhood?.message}
              />
              <Select label="Estado*">
                <option value="">Estado</option>
                <option {...register("address.state")} value="SC">
                  Santa Catarina
                </option>
              </Select>
              <Select label="Cidade*">
                <option value="">Cidade</option>
                <option {...register("address.city")} value="Fraiburgo">
                  Fraiburgo
                </option>
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
                {...register("billingAddress.neighborhood")}
                type="text"
                label="Bairro*"
                helperText={errors.billingAddress?.neighborhood?.message}
              />
              <Select label="Estado*">
                <option value="">Estado</option>
                <option {...register("billingAddress.state")} value="SC">
                  Santa Catarina
                </option>
              </Select>
              <Select label="Cidade*">
                <option value="">Cidade</option>
                <option {...register("billingAddress.city")} value="Fraiburgo">
                  Fraiburgo
                </option>
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
