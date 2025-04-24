import styled from "styled-components";
import { Input } from "../../components/Form/Input/Input";

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

export const Anotations = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #000;
  row-gap: 10px;

  textarea {
    height: 220px;
  }
`;

export const SubTitle = styled.h2``;

export const Text = styled.p``;

export const FormControl = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const FormControlCep = styled(FormControl)``;

export const BtnSearchCep = styled.button`
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
`;

export const Contact = styled.div`
  background-color: #fff;
  padding: 15px;
  height: 290px;
  width: 300px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  Input {
    width: 220px;
  }
`;

export const PointsAtention = styled.div`
  background-color: #fff;
  padding: 15px;
  height: 600px;
  width: 300px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  textarea {
    height: 600px;
  }

`

export const FormDate = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const BtnGroup = styled.div`
  grid-area: button;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
