import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  background-color: #cecece;
  padding: 5px;
  border-bottom: 1px solid #000;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 1.8rem;
  text-transform: uppercase;
`;

export const Form = styled.form`
  align-items: center;
  justify-items: center;
  width: 600px;
  max-height: 400px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
`;

export const FormControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 260px;
  align-items: center;
  margin-top: 20px;
`;

export const LabelForm = styled.label``;

export const InputForm = styled.input`
  padding: 10px;
`;

export const SelectForm = styled.select`
  padding: 10px;
`;

export const BtnControl = styled.div`
  padding-top: 25px;
`;

export const Link = styled.p`
  padding-top: 10px;
  padding-bottom: 20px;
`;
