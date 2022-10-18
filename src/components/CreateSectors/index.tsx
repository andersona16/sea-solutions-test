import { useEffect, useState } from "react";
import { PositionsProps, SectorProps } from "../../types/interface";
import { useSectors } from "../../hooks/useSectors";
import { api } from "../../services/api";

import { TiDelete } from "react-icons/ti";
import { Container, Content, Footer, InputGroup, Positions } from "./styles";
import { useToast } from "../../hooks/toast";

export function CreateSectors() {
  const [name, setName] = useState<string>("");
  const [currentPositions, setCurrentPositions] = useState<string>("");
  const [NewPositionsAdded, setNewPositionsAdded] = useState<PositionsProps[]>(
    []
  );
  const { addToast } = useToast();

  const {
    sectorToEdit,
    setSectorToEdit,
    positions,
    sectors,
    setSectors,
    setPositions,
    getSectorsData,
  } = useSectors();

  function getData() {
    setName(sectorToEdit.name);
    setNewPositionsAdded(sectorToEdit.positions);
  }

  useEffect(() => {
    if (sectorToEdit?.id) {
      getData();
    } else {
      resetFields();
    }
  }, [sectorToEdit]);

  function resetFields() {
    setName("");
    setCurrentPositions("");
    setNewPositionsAdded([]);
  }

  async function verifyPosition(positionName: string) {
    if (positions.length === 0) return undefined;
    let sectorAlreadyExists = positions.find(
      (item) => item.name.toLowerCase() == positionName.toLowerCase()
    );
    return sectorAlreadyExists;
  }

  async function verifySector(sectorName: string) {
    if (sectors.length === 0) return undefined;
    let sectorAlreadyExists = sectors.find(
      (item) => item.name.toLowerCase() == sectorName.toLowerCase()
    );
    return sectorAlreadyExists;
  }

  async function handleRegisterNewSector() {
    if (name === "") {
      return addToast({
        title: "Campo obrigatório",
        message: "Digite um nome para o setor",
        type: "error",
      });
    }

    let sectorAlreadyExists = await verifySector(name);

    if (sectorAlreadyExists) {
      return addToast({
        title: "Erro",
        message: "Já possui um setor com esse nome",
        type: "error",
      });
    }

    let sectorId = await api
      .post(`/sectors`, {
        name: name,
      })
      .then((response) => {
        setSectors((oldValue) => {
          let newValue = {
            id: response.data?.id,
            name: response.data.name,
            positions: [],
          };
          return [...oldValue, newValue];
        });
        return response.data.id;
      })
      .catch((error) => {
        return 0;
      });

    if (sectorId === 0) {
      return addToast({
        title: "Erro",
        message: "Houve um erro ao tentar criar o setor.",
        type: "error",
      });
    }

    NewPositionsAdded.forEach(async (position) => {
      await api
        .post(`/positions`, {
          name: position.name,
          sector_id: sectorId,
        })
        .then((response) => {
          setPositions((oldValue) => {
            return [...oldValue, response.data];
          });
        })
        .catch((error) => {
          addToast({
            title: "Erro",
            message: `Houve um erro ao tentar criar o cargo ${position.name}`,
            type: "error",
          });
        });
    });

    addToast({
      title: "Criado!",
      message: "Setor criado com sucesso!",
      type: "success",
    });

    resetFields();

    await getSectorsData();
  }

  async function handleUpdateSector() {
    if (name === "") {
      return addToast({
        title: "Campo obrigatório*",
        message: "O setor precisa de um nome.",
        type: "error",
      });
    }

    let sectorAlreadyExists = await verifySector(name);

    if (sectorAlreadyExists && sectorToEdit.id !== sectorAlreadyExists?.id) {
      return addToast({
        title: "Erro!",
        message: "Este setor já existe.",
        type: "error",
      });
    }

    let id = await api
      .put(`/sectors/${sectorToEdit?.id!}`, {
        name: name,
      })
      .then((response) => {
        return response.data.id;
      })
      .catch((err0r) => {
        return 0;
      });

    if (id === 0) {
      return addToast({
        title: " Erro!",
        message: "Este departamento já existe.",
        type: "error",
      });
    }

    NewPositionsAdded.forEach(async (position) => {
      if (!position.id) {
        await api.post(`/positions`, {
          name: position.name,
          sector_id: id,
        });
      }
    });

    positions.forEach(async (position) => {
      if (position.sector_id !== id) {
        return;
      }

      let positionWasNotDeleted = NewPositionsAdded.find(
        (item) => item?.id === position?.id
      );
      console.log(positionWasNotDeleted);
      if (!positionWasNotDeleted) {
        await api.delete(`/positions/${position?.id}`).catch((error) => { });
      }
    });

    await getSectorsData();
    resetFields();
    addToast({
      title: "Sucesso!",
      message: "O setor foi atualizado com sucesso!",
      type: "success",
    });
  }

  async function handleRegisterNewPost() {
    if (currentPositions === "") return;

    let positionAlreadyExists = await verifyPosition(currentPositions);

    if (positionAlreadyExists) {
      return addToast({
        title: "Este cargo já existe!",
        message: "O cargo já existe.",
        type: "error",
      });
    }

    setNewPositionsAdded((oldValue) => {
      return [...oldValue, { name: currentPositions }];
    });

    setCurrentPositions("");
  }

  function handleCancelEdit() {
    setSectorToEdit({} as SectorProps);
    resetFields();
  }

  return (
    <Container>
      <h1>
        {sectorToEdit?.id ? "Editar " + sectorToEdit.name : "Adicionar setor"}
      </h1>
      <Content>
        <InputGroup>
          <label htmlFor="">Nome:</label>
          <input
            value={name}
            onChange={(event: any) => setName(event.currentTarget.value)}
            placeholder="Nome do setor"
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="">Cargo(S):</label>
          <div>
            <input
              onKeyUp={(event: any) =>
                event.key === "Enter" && handleRegisterNewPost()
              }
              id="post-add"
              value={currentPositions}
              onChange={(event: any) =>
                setCurrentPositions(event.currentTarget.value)
              }
              placeholder="Nome do cargo"
            />
            <button onClick={handleRegisterNewPost}>Adicionar</button>
          </div>
        </InputGroup>
        {NewPositionsAdded.length > 0 ? (
          <p>Cargos:</p>
        ) : (
          <p>
            OBS: <span>Nenhum cargo adicionado.</span>
          </p>
        )}

        <Positions>
          {NewPositionsAdded.map((item, key) => (
            <p
              title="Clique para remover"
              onClick={() => {
                setNewPositionsAdded((oldValue) => {
                  return oldValue.filter((post) => post?.id !== item?.id);
                });
              }}
              key={key}
            >
              {item.name}
              <TiDelete size={25} />
            </p>
          ))}
        </Positions>
      </Content>
      <Footer>
        {sectorToEdit?.id && (
          <button onClick={handleCancelEdit}>Cancelar</button>
        )}
        <button
          onClick={() =>
            sectorToEdit.id ? handleUpdateSector() : handleRegisterNewSector()
          }
        >
          Salvar
        </button>
      </Footer>
    </Container>
  );
}
