import styled from "styled-components";

export const Pagination = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 45px;
  width: 400px;
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
  width: 300px;
`;

export const BtnOne = styled.button`
  border: none;
  width: 50px;
  height: 100%;
  cursor: pointer;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: #ddd;
`;

export const BtnEnd = styled(BtnOne)`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const Btn = styled(BtnOne)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
