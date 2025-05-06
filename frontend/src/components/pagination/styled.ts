import styled from "styled-components";

export const Pagination = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 45px;
  width: 800px;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #ddd;
  cursor: pointer;
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  height: 45px;
  min-width: 100px;
  background-color: #ddd;
  border-radius: 20px;
`;

export const Btn = styled.button`
  border: none;
  width: 50px;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
`;
