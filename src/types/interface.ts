import { Dispatch, ReactNode, SetStateAction } from "react";

export type SectorProps = {
  id?: number;
  name: string;
  positions: PositionsProps[];
};

export type PositionsProps = {
  id?: number;
  name: string;
  sector_id?: number;
};

export interface UseSectorsProps {
  children: React.ReactNode;
}

export interface SectorsContextData {
  sectors: SectorProps[];
  setSectors: Dispatch<SetStateAction<SectorProps[]>>;
  getSectorsData: () => void;
  deleteSector: (sectorId: number) => Promise<string>;
  sectorToEdit: SectorProps;
  setSectorToEdit: Dispatch<SetStateAction<SectorProps>>;
  positions: PositionsProps[];
  setPositions: Dispatch<SetStateAction<PositionsProps[]>>;
}
