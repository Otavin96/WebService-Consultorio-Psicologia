import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-left: 50px;
`;

export const Title = styled.h1`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-weight: normal;
  font-size: 2.2rem;
`;

export const AddUser = styled.div`
  border: 1px solid #000;
  border-radius: 3px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.08);
  width: 250px;
  height: 200px;
  background-image: url("../../../public/images/AddUser.png");
  background-size: 160px;
  background-repeat: no-repeat;
  background-position: center -10px;

  p {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    color: #000;
    position: relative;
    font-size: 1.2rem;
    text-align: center;
    top: 75%;
  }
`;
