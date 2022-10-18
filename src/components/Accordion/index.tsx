import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useSectors } from "../../hooks/useSectors";
import { SectorProps } from "../../types/interface";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import styles from "./styles.module.scss";

import { ButtonGroups } from "./styles";
import { useToast } from "../../hooks/toast";
interface AccordionProps {
  sector: SectorProps;
}

export function AccordionComponent({ sector }: AccordionProps) {
  const { id, name, positions } = sector;
  const { deleteSector, setSectorToEdit } = useSectors();

  const { addToast } = useToast();

  async function handleDeleteSector() {
    let response = await deleteSector(id!);

    if (response === "success") {
      addToast({
        title: "Sucesso",
        type: "success",
        message: "Setor excluído com sucesso!",
      });
    } else {
      addToast({
        title: "Erro",
        message: "Erro ao deletar o setor!",
        type: "error",
      });
    }
  }

  return (
    <>
      <Accordion allowToggle className={styles.accordion}>
        <AccordionItem className={styles.content}>
          <AccordionButton className={styles.header}>
            <p>{name}</p>
            <BsFillArrowDownCircleFill size={25} />
          </AccordionButton>
          <AccordionPanel>
            {positions?.length == 0 && <p>Nenhum cargo cadastrado.</p>}
            <ButtonGroups>
              {positions?.map((position, key) => (
                <p key={key}>{position.name}</p>
              ))}
            </ButtonGroups>
            <ButtonGroups>
              <button
                className={styles.editButton}
                onClick={() => setSectorToEdit(sector)}
              >
                Editar
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteSector}
              >
                Excluir
              </button>
            </ButtonGroups>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
