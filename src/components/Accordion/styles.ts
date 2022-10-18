import styled from "styled-components";

export const Container = styled.div`

`;

export const ButtonGroups = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 1rem;

  > button {
    background: #c4c4c4;
    color: #000000;
    padding: 5px 40px;
    text-transform: uppercase;
  }
`;
