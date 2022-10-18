import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95vw;
  max-width: 1300px;
  margin: 0 auto;
`;
export const NavBar = styled.nav`
  display: flex;
  width: 94%;
  margin: 1rem 0;
`;

export const NavBarMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  width: 150px;
  font-weight: bold;
  transition: all 0.2s;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.22);
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.22);

  > p {
    text-transform: uppercase;
    font-size: 0.75rem;
  }
`;

export const Content = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex-wrap: wrap;
  //  gap: 2rem;
  width: 94%;
`;
