import styled from "styled-components";
import { Input } from "../../../components/Form/Input/Input";

export const Container = styled.div`
  margin: 10px auto;
  display: grid;
  max-width: 1200px;
  gap: 20px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-areas:
    "leftSide rightSide"
    "button button";
  gap: 20px;
`;

export const LeftSide = styled.div`
  grid-area: leftSide;
`;

export const Title = styled.h1`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 2.4rem;
`;

export const DataClient = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const AddressClient = styled.div`
  display: grid;
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #000;
  row-gap: 10px;
`;

export const SubTitle = styled.h2``;

export const FormControl = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const FormControlCep = styled(FormControl)``;

export const BtnSearchCep = styled.a`
  font-size: 20px;
  border: none;
  background-color: #fff;
  width: 20px;
  cursor: pointer;
`;

export const InputPerso = styled(Input)`
  width: 500px;
`;

export const InputNumber = styled(Input)`
  width: 100px;
`;

export const RightSide = styled.div`
  grid-area: rightSide;
  background-color: #fff;
  padding-top: 20px;
  padding-left: 20px;
  height: 310px;
  width: 300px;
  border: 1px solid #000;
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  Input {
    width: 220px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 80px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const BtnGroup = styled.div`
  grid-area: button;
`;
