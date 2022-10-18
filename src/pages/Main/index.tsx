
import { Sectors } from "../../components/Sectors";
import { Container, Content, NavBar, NavBarMenu } from "./styles";
import { FaBuilding } from "react-icons/fa";
import { CreateSectors } from "../../components/CreateSectors";


export function Sections() {
  return (
    <Container>
      <NavBar>
        <NavBarMenu>
          <FaBuilding size={25} />
          <p>Setores</p>
        </NavBarMenu>
      </NavBar>
      <Content>
        <Sectors />
        <CreateSectors />
      </Content>
    </Container>
  );
}
