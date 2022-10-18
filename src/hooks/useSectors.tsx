import {
  createContext,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import {
  PositionsProps,
  SectorProps,
  SectorsContextData,
  UseSectorsProps,
} from "../types/interface";
import { api } from "../services/api";

export const SectorsContext = createContext({} as SectorsContextData);

function SectorsProvider({ children }: UseSectorsProps) {
  const [sectors, setSectors] = useState<SectorProps[]>([]);
  const [positions, setPositions] = useState<PositionsProps[]>([]);
  const [sectorToEdit, setSectorToEdit] = useState<SectorProps>(
    {} as SectorProps
  );

  async function getSectorsData() {
    let sectors = await api
      .get(`/sectors`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });

    let positions = await api
      .get("/positions")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });

    setPositions(positions);

    setSectors(
      sectors.map((sector: SectorProps) => {
        return {
          id: sector?.id,
          name: sector.name,
          positions: positions.filter(
            (position: PositionsProps) => position?.sector_id === sector?.id
          ),
        };
      })
    );
  }

  useEffect(() => {
    getSectorsData();
  }, []);

  async function deleteSector(sectorId: number) {
    positions.forEach(async (position: PositionsProps) => {
      if (position.sector_id === sectorId) {
        await api.delete(`/positions/${position?.id}`).catch();
      }
    });

    let status = await api
      .delete(`/sectors/${sectorId}`, {})
      .then((response) => {
        console.log(response);
        return "success";
      })
      .catch((error) => {
        console.log(error);
        return "error";
      });
    await getSectorsData();
    return status;
  }

  return (
    <SectorsContext.Provider
      value={{
        setSectors,
        getSectorsData,
        setPositions,
        sectors,
        deleteSector,
        sectorToEdit,
        setSectorToEdit,
        positions,
      }}
    >
      {children}
    </SectorsContext.Provider>
  );
}

function useSectors() {
  return useContext(SectorsContext);
}

export { useSectors, SectorsProvider };
