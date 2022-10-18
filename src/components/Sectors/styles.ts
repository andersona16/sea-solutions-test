import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 500px;
  max-height: 500px;
  background-color: white;
  gap: 16px;
  padding: 16px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.22);

  > h1 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.7rem;
    text-transform: uppercase;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
  gap: 1rem;
  overflow: auto;

  > p {
    color: red;
    font-weight: bold;
  }
`;
