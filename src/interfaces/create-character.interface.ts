import { DiceEnum } from "../enum/dice.enum";

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
