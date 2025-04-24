import { FaMapMarkerAlt } from "react-icons/fa";


import * as I from "./styled";
import { Input } from "../../components/Form/Input/Input";
import { Select } from "../../components/Form/Select/Select";
import { Button } from "../../components/Form/Button/Button";


const InsertConsultation = () => {
  return (
    <I.Container>
      <I.Title>Consulta</I.Title>
      <I.Form>
        <I.LeftSide>
          <I.DataClient>
            <Input type="text" label="CPF*" disabled />
            <Input type="text" label="Nome*" disabled />
            <Input type="text" label="Sobrenome*" disabled />
            <Input type="date" label="Data de nascimento*" disabled />
          </I.DataClient>

          <I.AddressClient>
            <I.SubTitle>Endereço</I.SubTitle>

            <I.FormControlCep>
              <Input type="text" label="CEP*" disabled />
              <I.BtnSearchCep>
                <FaMapMarkerAlt />
              </I.BtnSearchCep>
            </I.FormControlCep>

            <I.FormControl>
              <I.InputPerso type="text" label="Logradouro*" disabled />
              <I.InputNumber type="number" label="Número*" disabled />
            </I.FormControl>

            <I.FormControl>
              <Input type="text" label="Bairro*" disabled/>
              <Select label="Estado*" disabled>
                <option>Estado</option>
              </Select>
              <Select label="Cidade*" disabled>
                <option>Cidade</option>
              </Select>
            </I.FormControl>
          </I.AddressClient>

          <I.Anotations>
            <I.Text>Anotações das consultas anteriores</I.Text>
            <textarea />           
          </I.Anotations>

          <I.Anotations>
            <I.Text>Anotações da consulta atual</I.Text>
            <textarea />
          </I.Anotations>
        </I.LeftSide>

        <I.RightSide>
          
          <I.Contact>
          <I.SubTitle>Contato</I.SubTitle>
            <Input type="text" label="Telefone / Celular*" disabled />
            <Input type="text" label="WhatsApp" disabled />
            <Input type="email" label="E-mail*" disabled />
          </I.Contact>

          <I.PointsAtention>
          <I.SubTitle>Pontos de atenção</I.SubTitle>
          <textarea />
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
