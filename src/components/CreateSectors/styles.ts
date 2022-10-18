import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 500px;
  max-height: 500px;
  background-color: white;
  padding: 1rem;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.22);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.22);

  > h1 {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    span {
      color: red;
      font-weight: bold;
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  div {
    display: flex;
    gap: 2rem;
  }

  > button {
    padding: 0 1rem;
  }

  label {
    text-transform: uppercase;
    font-size: 14px;
    > span {
      color: red;
    }
  }

  input {
    border: none;
    background-color: #817f7f;
    padding: 10px;

    width: 100%;

    font-weight: 300;

    &::placeholder {
      color: black;
    }
    &:focus {
      outline: none;

      border: 1px solid #fff;
    }
  }

  button {
    background: #4a4a4a;
    color: #fff;

    padding: 12px 30px;

    text-transform: uppercase;

    font-size: 12px;
  }
`;

export const Positions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  max-height: 150px;
  overflow: auto;

  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    border: solid 2px var(--gray);
    padding: 0.2rem 1rem;
    transition: all 0.2s;

    &:hover {
      background-color: var(--primary-light);
      cursor: pointer;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  margin-top: auto;
  align-items: flex-end;
  justify-content: space-between;

  > button {
    margin-left: auto;

    background: #4a4a4a;
    color: #fff;

    padding: 12px 30px;

    text-transform: uppercase;

    font-size: 12px;
  }
`;
