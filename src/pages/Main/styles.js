import styled from "styled-components";

export const Container = styled.div`
  text-align: left;
`;

export const Services = styled.div`
  margin-top: 20px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #141518;
  border-radius: 10px;
  div{
    display: flex;
    justify-content: space-between; /* Alinha os itens à esquerda e à direita */
    align-items: center;
  }
`;
