import { DeathRollEnum } from "../enum/death-roll.enum";
import { DiceEnum } from "../enum/dice.enum";
import { Aptitude } from "./aptitude.interface";
import { Background } from "./background.interface";
import { IdName } from "./id-name.interface";
import { DetailedJob } from "./job.interface";
import { DetailedLineage } from "./lineage.interface";
import { PaginatedSearch } from "./paginated-search.interface";
import { Wound } from "./wound.interface";

export interface CreateCharacter {
  name: string;
  lineageId: string;
  backgroundId: string;
  jobId: string;
  intelligence: DiceEnum;
  cunning: DiceEnum;
  tenacity: DiceEnum;
  celerity: DiceEnum;
  aptitudeList: string[];
}

export interface BasicCharacter extends IdName {
  level: number;
  lineage: string;
  userId: string;
  userName: string;
  active: boolean;
}

export interface CharacterPaginated extends PaginatedSearch {
  list: BasicCharacter[];
}

export interface DetailedCharacter extends IdName {
  intelligence: string;
  cunning: string;
  tenacity: string;
  celerity: string;
  level: number;
  mentalCurrent: number;
  mentalTotal: number;
  physicalCurrent: number;
  physicalTotal: number;
  heroismCurrent: number;
  heroismTotal: number;
  bond?: string;
  motivation?: string;
  notes?: string;
  lineage: DetailedLineage;
  background: Background;
  job: DetailedJob;
  aptitudes: Aptitude[];
  wound?: Wound;
  deathRollBody: DeathRollEnum;
  deathRollMind: DeathRollEnum;
  deathRollSpirit: DeathRollEnum;
  active: boolean;
}

export interface UpdateAttributePayload {
  mentalCurrent: number;
  physicalCurrent: number;
  heroismCurrent: number;
}

export interface CampaignCharacterEdit extends IdName {
  lineage: string;
  initial: boolean;
  removedChar: boolean;
}

export interface CampaignCharacter extends IdName {
  level: number;
  mentalCurrent: number;
  mentalTotal: number;
  physicalCurrent: number;
  physicalTotal: number;
  lineage: string;
  background: string;
}
