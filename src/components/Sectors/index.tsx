import { useSectors } from "../../hooks/useSectors";
import { AccordionComponent } from "../Accordion";
import { Container, Content } from "./styles";

export function Sectors() {
  const { sectors } = useSectors();

  return (
    <Container>
      <h1>Setores</h1>
      <Content>
        {sectors.map((sector, key) => (
          <AccordionComponent sector={sector} key={key} />
        ))}
        {sectors.length < 1 && <p>Nenhum setor encontrado.</p>}
      </Content>
    </Container>
  );
}
