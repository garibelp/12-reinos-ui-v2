import { AttributeEnum } from "../enum/attribute.enum";
import { Aptitude } from "./aptitude.interface";
import { IdName } from "./id-name.interface";
import { Skill } from "./skill.interface";

export interface JobList {
  list: IdName[];
}

export interface DetailedJob extends IdName {
  description: string;
  mainAttribute: AttributeEnum;
  physicalPoints: number;
  mentalPoints: number;
  skills: Skill[];
  aptitudes: Aptitude[];
}
