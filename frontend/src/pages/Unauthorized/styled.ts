import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #ddd;
  height: 100vh;
  width: 100%;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  flex-direction: column;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 10px;
  height: 400px;
  width: 600px;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 2.2rem;
`;
