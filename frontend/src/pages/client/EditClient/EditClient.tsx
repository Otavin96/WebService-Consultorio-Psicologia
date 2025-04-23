import { FaMapMarkerAlt } from "react-icons/fa";
import { Input } from "../../../components/Form/Input/Input";
import { Select } from "../../../components/Form/Select/Select";

import * as I from "./styled";
import { Button } from "../../../components/Form/Button/Button";

const EditClient = () => {
  return (
    <I.Container>
      <I.Title>Alterar Cliente</I.Title>
      <I.Form>
        <I.LeftSide>
          <I.DataClient>
            <Input type="text" label="CPF*" disabled />
            <Input type="text" label="Nome*" />
            <Input type="text" label="Sobrenome*" />
            <Input type="date" label="Data de nascimento*" />
          </I.DataClient>

          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input type="text" label="CEP*" />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso type="text" label="Logradouro*" />
              <I.InputNumber type="number" label="Número*" />
            </I.FormControl>

            <I.FormControl>
              <Input type="text" label="Bairro*" />
              <Select label="Estado*">
                <option>Estado</option>
              </Select>
              <Select label="Cidade*">
                <option>Cidade</option>
              </Select>
            </I.FormControl>
          </I.AddressClient>

          <I.AddressClient>
            <I.Header>
              <I.SubTitle>Endereço de Cobrança</I.SubTitle>
              <I.CheckboxContainer>
                <input type="checkbox" />
                <label htmlFor="Utilizar o mesmo endereço de residência">
                  Utilizar o mesmo endereço de residência
                </label>
              </I.CheckboxContainer>
            </I.Header>

            <I.FormControlCep>
              <Input type="text" label="CEP*" />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso type="text" label="Logradouro*" />
              <I.InputNumber type="number" label="Número*" />
            </I.FormControl>

            <I.FormControl>
              <Input type="text" label="Bairro*" />
              <Select label="Estado*">
                <option>Estado</option>
              </Select>
              <Select label="Cidade*">
                <option>Cidade</option>
              </Select>
            </I.FormControl>
          </I.AddressClient>
        </I.LeftSide>

        <I.RightSide>
          <I.SubTitle>Contato</I.SubTitle>
          <I.Contact>
            <Input type="text" label="Telefone / Celular*" />
            <Input type="text" label="WhatsApp" />
            <Input type="email" label="E-mail*" />
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
