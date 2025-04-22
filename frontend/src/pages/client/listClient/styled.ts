import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  margin: 10px auto;
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h1`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 2.4rem;
`;

export const BtnInsertClient = styled.button`
  font-size: 0.9;
  font-weight: 600;
  width: 120px;
  height: 40px;
  background-color: #e9e9e9;
  border: 2px solid #808080;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    transition: 1s;
    background-color: #cecece;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Thead = styled.thead`
  height: 55px;
  background-color: #ddd;
  border: 2px solid rgb(140 140 140);
`;

export const Tbody = styled.tbody`
  background-color: #fff;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  border-right: 1px solid #808080;
`;

export const Td = styled.td`
  height: 70px;
  border: 1px solid #808080;
  padding-left: 10px;
`;

export const Span = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  font-size: 30px;
`;

export const LinkIcon = styled(Link)`
  color: #000;

  &:hover {
    color: #666;
    transition: 0.5s;
  }
`;
