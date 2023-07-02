import { EnergyTypeEnum } from "../enum/energy-type.enum";
import { SkillTypeEnum } from "../enum/skill-type.enum";
import { IdName } from "./id-name.interface";

export interface Skill extends IdName {
  description: string;
  cost: number;
  energyType: EnergyTypeEnum;
  skillType: SkillTypeEnum;
  skillLevel: number;
  range?: number;
}
